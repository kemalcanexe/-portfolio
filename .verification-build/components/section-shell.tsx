import type React from "react";
import { MotionDiv } from "@/components/motion";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className
}: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-20 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <MotionDiv className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-signal/80">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </MotionDiv>
        {children}
      </div>
    </section>
  );
}
