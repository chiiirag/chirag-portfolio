"use client";

import { useState } from "react";
import { saveService } from "@/app/actions/admin/services";
import { FormSection, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ActionForm } from "@/components/ui/action-form";
import { FieldError } from "@/components/ui/field-error";
import type { Service } from "@/lib/db/schema";
import { DynamicIcon, ICON_NAMES } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServiceForm({ service }: { service?: Service }) {
  const [icon, setIcon] = useState(service?.icon ?? "rocket");

  return (
    <ActionForm action={saveService.bind(null, service?.id ?? null)} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Service">
              <TextField name="title" label="Title" defaultValue={service?.title} errors={e.title} required maxLength={120} />
              <TextField
                name="description"
                label="Description"
                defaultValue={service?.description}
                errors={e.description}
                maxLength={240}
              />
              <fieldset className="sm:col-span-2">
                <legend className="label">Icon</legend>
                <input type="hidden" name="icon" value={icon} />
                <div className="flex flex-wrap gap-2">
                  {ICON_NAMES.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setIcon(name)}
                      aria-pressed={icon === name}
                      aria-label={name}
                      title={name}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl border transition",
                        icon === name
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:border-brand-300",
                      )}
                    >
                      <DynamicIcon name={name} className="size-5" />
                    </button>
                  ))}
                </div>
                <FieldError errors={e.icon} />
              </fieldset>
              <TextField
                name="sortOrder"
                label="Display order"
                type="number"
                defaultValue={service?.sortOrder ?? 0}
                errors={e.sortOrder}
              />
            </FormSection>
            <FormFooter
              state={state}
              pending={pending}
              cancelHref="/admin/services"
              submitLabel={service ? "Save changes" : "Create service"}
            />
          </>
        );
      }}
    </ActionForm>
  );
}
