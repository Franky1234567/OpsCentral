import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full max-w-[900px] mx-auto px-4 py-6 md:px-6 md:py-8">
      <div
        className="bg-white border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center"
        style={{ boxShadow: "0px 1px 3px rgba(30, 41, 59, 0.1)" }}
      >
        <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-4 opacity-60">
          <span className="material-symbols-outlined text-on-surface-variant text-[48px]">search_off</span>
        </div>
        <h2 className="text-h1 text-on-background mb-1">Page not found</h2>
        <p className="text-body-base text-on-surface-variant mb-6 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/users"
          className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-label-caps py-2 px-8 rounded transition-colors shadow-sm active:scale-95"
        >
          Go to Users
        </Link>
      </div>
    </main>
  );
}