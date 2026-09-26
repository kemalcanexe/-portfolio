"use client";

import { useSearch } from "@/components/search-context";

// A research field in the header that runs itself as a query.
export function FieldLink({ children }: { children: string }) {
  const { setQuery } = useSearch();
  return (
    <button
      type="button"
      onClick={() => {
        setQuery(children);
        document.getElementById("q")?.focus();
      }}
      className="underline decoration-violet/35 decoration-2 underline-offset-[5px] transition-colors hover:text-violet hover:decoration-violet"
    >
      {children}
    </button>
  );
}
