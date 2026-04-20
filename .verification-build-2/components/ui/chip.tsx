import type React from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[8px] border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-rose-300/90",
        className
      )}
    >
      {children}
    </span>
  );
}
