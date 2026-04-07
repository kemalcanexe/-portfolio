import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  download?: boolean;
  external?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-cyan-signal/50 bg-cyan-signal text-ink-950 shadow-signal-sm hover:bg-cyan-200",
  secondary:
    "border-white/15 bg-white/[0.055] text-white hover:border-cyan-signal/40 hover:bg-cyan-signal/[0.09]",
  ghost:
    "border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.045] hover:text-white"
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className,
  download,
  external
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-[8px] border px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-signal",
    variants[variant],
    className
  );

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
        rel={external && !href.startsWith("mailto:") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
