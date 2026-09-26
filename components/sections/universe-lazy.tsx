"use client";

import dynamic from "next/dynamic";

// three.js is heavy; load the 3D section in its own chunk after the page is up.
const Lazy = dynamic(() => import("@/components/sections/universe").then((m) => m.Universe), {
  ssr: false,
  loading: () => <div className="h-[100vh]" />
});

// Stable wrapper so scroll triggers can attach before the chunk arrives.
export function UniverseLazy() {
  return (
    <div data-tone="explore">
      <Lazy />
    </div>
  );
}
