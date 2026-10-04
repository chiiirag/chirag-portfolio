import { CircleCheck, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";
import type { ActionState } from "@/lib/validation";

export function FormFooter({
  state,
  pending,
  cancelHref,
  submitLabel = "Save changes",
}: {
  state: ActionState;
  pending: boolean;
  cancelHref?: string;
  submitLabel?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
      {state.message && !pending && (
        <p role="status" className={`mr-auto flex items-center gap-1.5 text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}>
          {state.ok && <CircleCheck className="size-4" />}
          {state.message}
        </p>
      )}
      {cancelHref && (
        <Link href={cancelHref} className="btn-ghost">
          Cancel
        </Link>
      )}
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
        {pending ? "Saving…" : submitLabel}
      </button>
    </div>
  );
}
