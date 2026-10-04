export default function Loading() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 rounded-lg bg-slate-200" />
      <div className="h-4 w-72 rounded bg-slate-200" />
      <div className="h-64 rounded-3xl bg-slate-200/70" />
    </div>
  );
}
