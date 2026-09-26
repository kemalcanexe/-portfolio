import { entries, sections, service, skills, webNote, type SectionId } from "@/content/cv";
import { HybridIndex, type Doc } from "@/lib/search";

export type CorpusItem = { id: string; section: SectionId; title: string; org?: string; text: string[] };

export const corpus: CorpusItem[] = [
  ...entries.map((e) => ({
    id: e.id,
    section: e.section,
    title: e.title,
    org: e.org,
    text: [
      [e.org, e.location, e.period].filter(Boolean).join(", "),
      e.authors ?? "",
      e.venue ?? "",
      ...e.bullets,
      (e.tags ?? []).join(", ")
    ].filter(Boolean)
  })),
  {
    id: "skills",
    section: "skills",
    title: "Skills",
    text: [...skills.map((g) => `${g.label}: ${g.items.join(", ")}`), webNote]
  },
  { id: "service", section: "service", title: "Service and volunteering", text: [service] }
];

const docs: Doc[] = corpus.map((item) => ({
  id: item.id,
  title: item.title,
  fields: [
    { text: item.title, weight: 2 },
    { text: item.text.join(" "), weight: 1 }
  ]
}));

export const index = new HybridIndex(docs);

export const corpusById = new Map(corpus.map((item) => [item.id, item]));

export const sectionLabel = Object.fromEntries(sections.map((s) => [s.id, s.label])) as Record<SectionId, string>;
