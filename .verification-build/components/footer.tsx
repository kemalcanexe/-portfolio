import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}. Built for intelligent systems and meaningful work.</p>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
          Istanbul · AI · Data · Engineering
        </p>
      </div>
    </footer>
  );
}
