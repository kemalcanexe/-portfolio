import type React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[8px] border border-white/10 bg-white/[0.035] shadow-panel-glow backdrop-blur-xl transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}
