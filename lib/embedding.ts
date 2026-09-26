// Places every corpus entry in 3D so that entries with similar wording sit
// close together: TF-IDF vectors, cosine-normalized, then PCA to three
// components (eigenvectors of the centred Gram matrix, by power iteration).

import { corpus } from "@/lib/corpus";
import { tokenize } from "@/lib/search";

export type Point = { id: string; x: number; y: number; z: number; neighbors: string[] };

function tfidf(): Map<string, number>[] {
  const docs = corpus.map((c) => tokenize([c.title, c.title, ...c.text].join(" ")));
  const df = new Map<string, number>();
  for (const tokens of docs) for (const t of new Set(tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  return docs.map((tokens) => {
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    const v = new Map<string, number>();
    let norm = 0;
    for (const [t, f] of tf) {
      // Terms that appear in one entry only say nothing about similarity.
      if ((df.get(t) ?? 0) < 2) continue;
      const w = (1 + Math.log(f)) * Math.log(docs.length / (df.get(t) ?? 1));
      v.set(t, w);
      norm += w * w;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [t, w] of v) v.set(t, w / norm);
    return v;
  });
}

function dot(a: Map<string, number>, b: Map<string, number>) {
  let s = 0;
  for (const [t, w] of a) s += w * (b.get(t) ?? 0);
  return s;
}

function topEigen(matrix: number[][], k: number) {
  const n = matrix.length;
  const m = matrix.map((row) => [...row]);
  const out: { value: number; vector: number[] }[] = [];
  for (let c = 0; c < k; c++) {
    let v = Array.from({ length: n }, (_, i) => Math.sin(i * 12.9898 + c * 78.233) + 1.5);
    let value = 0;
    for (let iter = 0; iter < 300; iter++) {
      const next = m.map((row) => row.reduce((s, x, j) => s + x * v[j], 0));
      const norm = Math.sqrt(next.reduce((s, x) => s + x * x, 0)) || 1;
      value = norm;
      v = next.map((x) => x / norm);
    }
    out.push({ value, vector: v });
    // Deflate so the next iteration finds the next component.
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) m[i][j] -= value * v[i] * v[j];
  }
  return out;
}

export function embed(): Point[] {
  const vectors = tfidf();
  const n = vectors.length;
  const sim = vectors.map((a) => vectors.map((b) => dot(a, b)));

  // Double-centre the similarity (Gram) matrix, as classical PCA/MDS does.
  const rowMean = sim.map((r) => r.reduce((s, x) => s + x, 0) / n);
  const total = rowMean.reduce((s, x) => s + x, 0) / n;
  const centred = sim.map((r, i) => r.map((x, j) => x - rowMean[i] - rowMean[j] + total));

  const comps = topEigen(centred, 3);
  const coords = Array.from({ length: n }, (_, i) => comps.map((c) => c.vector[i] * Math.sqrt(Math.max(c.value, 0))));

  // Scale into a unit-ish sphere.
  const radius = Math.max(...coords.map((c) => Math.hypot(...c))) || 1;

  return corpus.map((item, i) => {
    const neighbors = sim[i]
      .map((s, j) => ({ j, s }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => b.s - a.s)
      .slice(0, 2)
      .filter(({ s }) => s > 0.08)
      .map(({ j }) => corpus[j].id);
    return {
      id: item.id,
      x: coords[i][0] / radius,
      y: coords[i][1] / radius,
      z: coords[i][2] / radius,
      neighbors
    };
  });
}
