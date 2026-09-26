// A small hybrid retriever that runs in the browser.
//
// Two retrievers score every document independently:
//   - BM25 over word tokens (lexical, exact terms)
//   - TF-IDF cosine over character trigrams (tolerant to typos and partial words)
// Scores are normalized per query, each retriever gets a confidence
// from the shape of its score distribution (Top-K Gap and Entropy, averaged
// as a Hybrid estimator), and the fused score is the confidence-weighted sum.
// This follows the approach in "Beyond Skewness: Confidence-Guided Rank
// Fusion for Text Retrieval" (ICMLA 2026), reduced to two retrievers.

export type Doc = {
  id: string;
  title: string;
  // Fields searched, with their weight in BM25 term frequency.
  fields: { text: string; weight: number }[];
};

type Retriever = "bm25" | "ngram";

export type RetrieverStats = {
  hits: number;
  confidence: number;
  weight: number;
};

export type Hit = {
  id: string;
  score: number;
  // Contribution of each retriever to the fused score (sums to score).
  parts: Record<Retriever, number>;
};

export type SearchResult = {
  hits: Hit[];
  stats: Record<Retriever, RetrieverStats>;
  terms: string[];
};

const STOPWORDS = new Set(
  "a an and are as at be by for from in into is it of on or the to with via over under than that this their its was were".split(" ")
);

export function fold(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .toLowerCase();
}

// Light suffix stripping so "rankings", "ranking" and "rank" meet.
export function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

export function tokenize(text: string): string[] {
  return fold(text)
    .split(/[^a-z0-9@.+#]+/)
    .map((t) => t.replace(/^[.]+|[.]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

function trigrams(text: string): string[] {
  const grams: string[] = [];
  for (const word of fold(text).split(/[^a-z0-9]+/)) {
    if (!word) continue;
    const padded = ` ${word} `;
    for (let i = 0; i < padded.length - 2; i++) grams.push(padded.slice(i, i + 3));
  }
  return grams;
}

const K1 = 1.2;
const B = 0.75;
const TOP_K = 5;

export class HybridIndex {
  readonly docs: Doc[];
  readonly vocabularySize: number;
  private tf: Map<string, number>[] = [];
  private lengths: number[] = [];
  private avgLength = 0;
  private df = new Map<string, number>();
  private gramSets: Set<string>[] = [];
  private gramIdf = new Map<string, number>();

  constructor(docs: Doc[]) {
    this.docs = docs;

    for (const doc of docs) {
      const tf = new Map<string, number>();
      let length = 0;
      for (const field of doc.fields) {
        for (const token of tokenize(field.text)) {
          tf.set(token, (tf.get(token) ?? 0) + field.weight);
          length += field.weight;
        }
      }
      for (const token of tf.keys()) this.df.set(token, (this.df.get(token) ?? 0) + 1);
      this.tf.push(tf);
      this.lengths.push(length);
    }
    this.avgLength = this.lengths.reduce((a, b) => a + b, 0) / Math.max(docs.length, 1);
    this.vocabularySize = this.df.size;

    this.gramSets = docs.map((doc) => new Set(trigrams(doc.fields.map((f) => f.text).join(" "))));
    const gramDf = new Map<string, number>();
    for (const set of this.gramSets) {
      for (const gram of set) gramDf.set(gram, (gramDf.get(gram) ?? 0) + 1);
    }
    for (const [gram, df] of gramDf) this.gramIdf.set(gram, Math.log(1 + docs.length / df));
  }

  bm25(terms: string[]): number[] {
    const n = this.docs.length;
    return this.tf.map((tf, i) => {
      let score = 0;
      for (const term of terms) {
        const f = tf.get(term);
        if (!f) continue;
        const df = this.df.get(term) ?? 0;
        const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
        score += (idf * f * (K1 + 1)) / (f + K1 * (1 - B + (B * this.lengths[i]) / this.avgLength));
      }
      return score;
    });
  }

  // Share of the query's trigrams (idf-weighted) that appear in the document.
  // Asymmetric on purpose: long documents are not penalized for extra text.
  ngram(query: string): number[] {
    const grams = [...new Set(trigrams(query))].filter((g) => this.gramIdf.has(g));
    const total = grams.reduce((sum, g) => sum + (this.gramIdf.get(g) ?? 0), 0);
    if (!total) return this.docs.map(() => 0);
    return this.gramSets.map((set) => {
      let covered = 0;
      for (const g of grams) if (set.has(g)) covered += this.gramIdf.get(g) ?? 0;
      return covered / total;
    });
  }

  search(query: string): SearchResult {
    const terms = [...new Set(tokenize(query))];
    const raw: Record<Retriever, number[]> = {
      bm25: this.bm25(terms),
      // Partial trigram overlap is common between unrelated words; keep strong matches only.
      ngram: this.ngram(query).map((s) => (s < 0.6 ? 0 : s))
    };

    const normalized = {} as Record<Retriever, number[]>;
    const stats = {} as Record<Retriever, RetrieverStats>;
    for (const r of Object.keys(raw) as Retriever[]) {
      normalized[r] = normalize(raw[r]);
      stats[r] = {
        hits: raw[r].filter((s) => s > 0).length,
        confidence: confidence(normalized[r]),
        weight: 0
      };
    }

    const total = stats.bm25.confidence + stats.ngram.confidence;
    for (const r of Object.keys(stats) as Retriever[]) {
      stats[r].weight = total ? stats[r].confidence / total : 0;
    }

    const hits: Hit[] = this.docs
      .map((doc, i) => {
        const parts = {
          bm25: stats.bm25.weight * normalized.bm25[i],
          ngram: stats.ngram.weight * normalized.ngram[i]
        };
        return { id: doc.id, score: parts.bm25 + parts.ngram, parts };
      })
      .filter((hit) => hit.score > 0.05)
      .sort((a, b) => b.score - a.score);

    return { hits, stats, terms };
  }
}

// Per-query normalization: divide by the best score so retrievers on
// different scales become comparable before fusion.
function normalize(scores: number[]): number[] {
  const max = Math.max(0, ...scores);
  return max ? scores.map((s) => s / max) : scores;
}

// Hybrid of Top-K Gap and (1 - normalized entropy) over the top-K scores.
// A peaked distribution means the retriever is sure; a flat one means it is guessing.
function confidence(scores: number[]): number {
  const top = scores.filter((s) => s > 0).sort((a, b) => b - a).slice(0, TOP_K);
  if (!top.length) return 0;
  if (top.length === 1) return 1;

  const gap = top[0] - top[top.length - 1];

  const sum = top.reduce((a, b) => a + b, 0);
  const entropy = -top.reduce((h, s) => {
    const p = s / sum;
    return h + p * Math.log(p);
  }, 0);
  const peakedness = 1 - entropy / Math.log(top.length);

  return Math.max(0.05, (gap + peakedness) / 2);
}
