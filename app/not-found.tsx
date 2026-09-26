import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-5 sm:px-8">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">This page does not exist yet.</h1>
      <p className="mt-4 text-lg text-muted">The link may be a placeholder that has not been filled in.</p>
      <Link
        href="/"
        className="mt-8 self-start text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
