"use client";

import type React from "react";
import type { Entry as EntryData } from "@/content/cv";
import { profile } from "@/content/cv";
import { Highlight } from "@/components/highlight";
import { useSearch } from "@/components/search-context";

// Visual state shared by everything that can be retrieved: dims when a query
// does not reach it, shows a rule when the query or a hovered term does.
export function Retrievable({
  id,
  className = "",
  children
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { result, matched, hovered } = useSearch();
  const hit = matched.has(id) || hovered.has(id);
  const dim = (result && !matched.has(id)) || (hovered.size > 0 && !hovered.has(id));
  return (
    <div
      id={id}
      className={`relative -mx-3 px-3 transition-opacity duration-300 ${dim ? "opacity-35" : ""} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -left-1 top-1 bottom-1 w-[3px] origin-top bg-violet transition-transform duration-300 ${
          hit ? "scale-y-100" : "scale-y-0"
        }`}
      />
      {children}
    </div>
  );
}

export function Term({ children }: { children: string }) {
  const { setHoverTerm, setQuery, hoverTerm } = useSearch();
  return (
    <button
      type="button"
      onMouseEnter={() => setHoverTerm(children)}
      onMouseLeave={() => setHoverTerm(null)}
      onFocus={() => setHoverTerm(children)}
      onBlur={() => setHoverTerm(null)}
      onClick={() => {
        setHoverTerm(null);
        setQuery(children);
        document.getElementById("q")?.focus();
      }}
      title={`Search for ${children}`}
      className={`text-sm transition-colors ${hoverTerm === children ? "text-violet" : "text-muted hover:text-violet"}`}
    >
      {children}
    </button>
  );
}

function Links({ links }: { links?: EntryData["links"] }) {
  if (!links?.length) return null;
  return (
    <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
        >
          {l.label}
        </a>
      ))}
    </p>
  );
}

export function Entry({ entry, children }: { entry: EntryData; children?: React.ReactNode }) {
  const meta = [entry.org, entry.location].filter(Boolean).join(", ");
  return (
    <Retrievable
      id={entry.id}
      className={`py-5 ${entry.period ? "grid gap-x-8 gap-y-1 sm:grid-cols-[9.5rem_1fr]" : ""}`}
    >
      {entry.period && <p className="text-sm text-muted sm:pt-0.5">{entry.period}</p>}
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug">
          <Highlight text={entry.title} />
        </h3>
        {meta && (
          <p className="text-muted">
            <Highlight text={meta} />
          </p>
        )}
        {entry.bullets.length > 0 && (
          <ul className="mt-2 max-w-measure space-y-1.5 leading-relaxed">
            {entry.bullets.map((b) => (
              <li key={b} className="relative pl-4 before:absolute before:left-0 before:text-muted before:content-['–']">
                <Highlight text={b} />
              </li>
            ))}
          </ul>
        )}
        {children}
        {entry.tags && (
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {entry.tags.map((t) => (
              <Term key={t}>{t}</Term>
            ))}
          </p>
        )}
        <Links links={entry.links} />
      </div>
    </Retrievable>
  );
}

function Authors({ authors }: { authors: string }) {
  const own = "N. Yalçın";
  return (
    <>
      {authors.split(own).map((part, i, all) => (
        <span key={i}>
          {part}
          {i < all.length - 1 && <strong className="font-semibold text-ink">{own}</strong>}
        </span>
      ))}
    </>
  );
}

export function Publication({ entry, year }: { entry: EntryData; year: string }) {
  return (
    <Retrievable id={entry.id} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[9.5rem_1fr]">
      <p className="text-sm text-muted sm:pt-1.5">{year}</p>
      <div className="min-w-0 max-w-measure">
        <h3 className="font-serif text-2xl italic leading-tight">
          <Highlight text={entry.title} />
        </h3>
        <p className="mt-2 text-muted">
          <Authors authors={entry.authors ?? profile.name} />
        </p>
        <p className="text-muted">
          <Highlight text={entry.venue ?? ""} />
        </p>
        {entry.bullets.map((b) => (
          <p key={b} className="mt-2 leading-relaxed">
            <Highlight text={b} />
          </p>
        ))}
        <Links links={entry.links} />
      </div>
    </Retrievable>
  );
}

export function Compact({ entry }: { entry: EntryData }) {
  return (
    <Retrievable id={entry.id} className="py-3">
      <h3 className="font-semibold leading-snug">
        <Highlight text={entry.title} />
      </h3>
      {entry.bullets.map((b) => (
        <p key={b} className="max-w-measure leading-relaxed text-muted">
          <Highlight text={b} />
        </p>
      ))}
      <Links links={entry.links} />
    </Retrievable>
  );
}
