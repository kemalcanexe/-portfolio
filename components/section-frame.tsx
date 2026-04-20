import type React from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function SectionFrame({
  id,
  className,
  children
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 py-24 sm:py-28 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.26em] text-rose-300/80">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 text-base leading-8 text-stone-300/88 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
