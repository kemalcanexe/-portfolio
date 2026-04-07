import type React from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] border border-cyan-signal/18 bg-cyan-signal/[0.055] px-2.5 py-1 text-xs font-medium text-cyan-100/85",
        className
      )}
    >
      {children}
    </span>
  );
}
