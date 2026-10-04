"use client";

import { Check, LoaderCircle, Plus } from "lucide-react";
import { deleteStat, saveStat } from "@/app/actions/admin/stats";
import { DeleteButton } from "@/components/admin/delete-button";
import { ActionForm } from "@/components/ui/action-form";

type StatRow = { id: number; value: string; label: string; sortOrder: number };

function StatForm({ stat, nextOrder }: { stat?: StatRow; nextOrder?: number }) {
  const isNew = !stat;
  return (
    <ActionForm action={saveStat.bind(null, stat?.id ?? null)} resetOnSuccess={isNew} className="flex flex-wrap items-start gap-2">
      {(state, pending) => (
        <>
          <input
            name="value"
            defaultValue={stat?.value}
            placeholder="8+"
            aria-label="Value"
            maxLength={40}
            className={`input w-24 ${state.errors?.value ? "border-red-400" : ""}`}
          />
          <input
            name="label"
            defaultValue={stat?.label}
            placeholder="Years Experience"
            aria-label="Label"
            maxLength={80}
            className={`input min-w-40 flex-1 ${state.errors?.label ? "border-red-400" : ""}`}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={stat?.sortOrder ?? nextOrder ?? 0}
            aria-label="Order"
            className="input w-20"
          />
          <button type="submit" className={isNew ? "btn-primary" : "btn-outline"} disabled={pending} aria-label={isNew ? "Add stat" : "Save stat"}>
            {pending ? <LoaderCircle className="size-4 animate-spin" /> : isNew ? <Plus className="size-4" /> : <Check className="size-4" />}
            {isNew && "Add"}
          </button>
          {stat && <DeleteButton action={deleteStat.bind(null, stat.id)} confirmText={`Delete "${stat.label}"?`} />}
          {state.message && !pending && !state.ok && <p className="w-full text-xs text-red-600">{state.message}</p>}
        </>
      )}
    </ActionForm>
  );
}

export function StatsManager({ stats }: { stats: StatRow[] }) {
  const nextOrder = stats.length ? Math.max(...stats.map((s) => s.sortOrder)) + 1 : 0;
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-base font-bold text-ink">Hero stats</h2>
      <p className="mt-0.5 text-sm text-slate-500">Numbers shown under the hero headline (value · label · order).</p>
      <div className="mt-5 space-y-3">
        {stats.map((stat) => (
          <StatForm key={`${stat.id}-${stat.value}-${stat.label}-${stat.sortOrder}`} stat={stat} />
        ))}
        <div className="border-t border-dashed border-slate-200 pt-3">
          <StatForm nextOrder={nextOrder} />
        </div>
      </div>
    </section>
  );
}
