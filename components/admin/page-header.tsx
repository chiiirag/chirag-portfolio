import { Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  newHref,
  newLabel = "Add new",
  actions,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {newHref && (
          <Link href={newHref} className="btn-primary">
            <Plus className="size-4" /> {newLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="card p-10 text-center text-sm text-slate-500">{children}</div>;
}
