import { profile } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built as a personal world for
          intelligent systems, research, and meaningful work.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-rose-300/55">
          Istanbul · AI · Data · Software · Research
        </p>
      </div>
    </footer>
  );
}
