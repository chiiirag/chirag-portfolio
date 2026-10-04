"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { ActionForm } from "@/components/ui/action-form";
import { FieldError } from "@/components/ui/field-error";

export function ContactForm() {
  return (
    <ActionForm action={submitContact} className="space-y-4" resetOnSuccess>
      {(state, pending) => (
        <>
          {/* Honeypot field, hidden from humans */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">Name</label>
              <input id="name" name="name" required maxLength={120} autoComplete="name" className="input" />
              <FieldError errors={state.errors?.name} />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="input" />
              <FieldError errors={state.errors?.email} />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="label">
              Subject <span className="text-slate-400">(optional)</span>
            </label>
            <input id="subject" name="subject" maxLength={200} className="input" />
            <FieldError errors={state.errors?.subject} />
          </div>
          <div>
            <label htmlFor="message" className="label">Message</label>
            <textarea id="message" name="message" required rows={5} maxLength={5000} className="input resize-y" />
            <FieldError errors={state.errors?.message} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
              {pending ? "Sending…" : "Send Message"}
            </button>
            {state.message && !pending && (
              <p role="status" className={state.ok ? "flex items-center gap-1.5 text-sm text-emerald-600" : "text-sm text-red-600"}>
                {state.ok && <CircleCheck className="size-4" />}
                {state.message}
              </p>
            )}
          </div>
        </>
      )}
    </ActionForm>
  );
}
