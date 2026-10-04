"use client";

import { LoaderCircle, LogIn } from "lucide-react";
import { login } from "@/app/actions/auth";
import { ActionForm } from "@/components/ui/action-form";
import { FieldError } from "@/components/ui/field-error";

export function LoginForm({ next }: { next: string }) {
  return (
    <ActionForm action={login} className="mt-6 space-y-4">
      {(state, pending) => (
        <>
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required className="input" />
            <FieldError errors={state.errors?.email} />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
            <FieldError errors={state.errors?.password} />
          </div>
          {state.message && !pending && (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.message}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={pending}>
            {pending ? <LoaderCircle className="size-4 animate-spin" /> : <LogIn className="size-4" />}
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </>
      )}
    </ActionForm>
  );
}
