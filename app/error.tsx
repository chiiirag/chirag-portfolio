"use client";

import { useEffect } from "react";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-ink">Something went wrong</h1>
      <p className="mt-2 text-slate-600">Please try again in a moment.</p>
      <button type="button" onClick={() => retry()} className="btn-primary mt-6">
        Try again
      </button>
    </main>
  );
}
