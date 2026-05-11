"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UserDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full max-w-[900px] mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-2 mb-6">
        <Link
          href="/users"
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity text-h2"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Users
        </Link>
      </div>

      <div
        className="bg-white border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center"
        style={{ boxShadow: "0px 1px 3px rgba(30, 41, 59, 0.1)" }}
      >
        <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-error text-[32px]">warning</span>
        </div>
        <h2 className="text-h1 text-on-background mb-1">Failed to load user</h2>
        <p className="text-body-base text-on-surface-variant mb-6 max-w-sm">
          {error.message ?? "Something went wrong while loading this user. Please try again."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-label-caps py-2 px-6 rounded transition-colors shadow-sm active:scale-95"
          >
            Try again
          </button>
          <Link
            href="/users"
            className="bg-surface-variant hover:bg-surface-container-high text-on-surface text-label-caps py-2 px-6 rounded transition-colors active:scale-95"
          >
            Back to list
          </Link>
        </div>
      </div>
    </main>
  );
}
