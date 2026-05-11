"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UsersError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-display-lg text-on-background">Users</h1>
        <p className="text-body-base text-on-surface-variant mt-1">Manage and explore user activity</p>
      </div>

      <div className="bg-surface border border-outline-variant rounded-lg shadow-sm p-8 min-h-64 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-error text-[32px]">warning</span>
        </div>
        <h3 className="text-h1 text-on-background mb-1">Something went wrong</h3>
        <p className="text-body-base text-on-surface-variant mb-6 max-w-sm">
          {error.message ?? "We encountered an issue loading the user directory. Please try again."}
        </p>
        <button
          onClick={reset}
          className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-label-caps py-2 px-8 rounded transition-colors shadow-sm active:scale-95"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
