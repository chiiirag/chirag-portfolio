"use client";

import { useEffect } from "react";

export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card p-10 text-center">
      <h1 className="text-xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-500">
        The admin panel couldn&apos;t load this page. Check your database connection and try again.
      </p>
      <button type="button" onClick={() => retry()} className="btn-primary mt-6">
        Try again
      </button>
    </div>
  );
}
