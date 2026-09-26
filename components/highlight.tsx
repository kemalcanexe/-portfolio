"use client";

import { fold, stem } from "@/lib/search";
import { useSearch } from "@/components/search-context";

export function matchesTerm(word: string, terms: string[]): boolean {
  const w = stem(fold(word).replace(/[^a-z0-9@.+#]/g, ""));
  if (w.length < 2) return false;
  return terms.some((t) => w === t || (t.length >= 3 && w.startsWith(t)));
}

// Marks every word of `text` that the current query retrieves on.
export function Highlight({ text, terms }: { text: string; terms?: string[] }) {
  const { result } = useSearch();
  const active = terms ?? result?.terms ?? [];
  if (!active.length) return <>{text}</>;

  return (
    <>
      {text.split(/(\s+)/).map((part, i) => {
        if (!part.trim()) return part;
        // Keep trailing punctuation outside the mark.
        const [, core, tail] = part.match(/^(.*?)([.,;:)]*)$/) ?? [part, part, ""];
        return matchesTerm(core, active) ? (
          <span key={i}>
            <mark>{core}</mark>
            {tail}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
