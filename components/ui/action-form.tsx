"use client";

import { startTransition, useActionState, useEffect, useRef, type ReactNode } from "react";
import type { ActionState } from "@/lib/validation";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: (state: ActionState, pending: boolean) => ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
};

/**
 * Form bound to a Server Action via useActionState. Submits manually so React does not
 * auto-reset the fields — users keep their input when validation fails.
 */
export function ActionForm({ action, children, className, resetOnSuccess = false }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resetOnSuccess && state.ok) formRef.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form
      ref={formRef}
      className={className}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
    >
      {children(state, pending)}
    </form>
  );
}
