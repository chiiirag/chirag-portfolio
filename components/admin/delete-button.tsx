"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTransition } from "react";

type Props = {
  action: () => Promise<void>;
  confirmText?: string;
  label?: string;
};

export function DeleteButton({ action, confirmText = "Delete this item? This cannot be undone.", label }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-label={label ?? "Delete"}
      className={label ? "btn-danger" : "btn-ghost px-2.5 text-red-600 hover:bg-red-50 hover:text-red-700"}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(async () => {
          try {
            await action();
          } catch (error) {
            // Let Next.js handle redirect() thrown by the action.
            unstable_rethrow(error);
            console.error(error);
            window.alert("Could not delete. Please try again.");
          }
        });
      }}
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
      {label}
    </button>
  );
}
