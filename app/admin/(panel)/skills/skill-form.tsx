"use client";

import { useState } from "react";
import { saveSkill } from "@/app/actions/admin/skills";
import { CheckboxField, FormSection, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ActionForm } from "@/components/ui/action-form";
import { FieldError } from "@/components/ui/field-error";
import { SkillIcon } from "@/components/ui/skill-icon";
import type { Skill } from "@/lib/db/schema";
import { ICON_NAMES } from "@/lib/icons";

export function SkillForm({ skill }: { skill?: Skill }) {
  const [icon, setIcon] = useState(skill?.icon ?? "");

  return (
    <ActionForm action={saveSkill.bind(null, skill?.id ?? null)} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Skill">
              <TextField name="name" label="Name" defaultValue={skill?.name} errors={e.name} required maxLength={80} />
              <TextField name="category" label="Category" placeholder="Backend" defaultValue={skill?.category} errors={e.category} maxLength={80} />

              <div className="sm:col-span-2">
                <label htmlFor="icon" className="label">
                  Icon
                </label>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                    <SkillIcon icon={icon} name="Preview" />
                  </span>
                  <input
                    id="icon"
                    name="icon"
                    value={icon}
                    onChange={(event) => setIcon(event.target.value)}
                    placeholder="flutter"
                    maxLength={2000}
                    className="input"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Use a{" "}
                  <a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                    Simple Icons
                  </a>{" "}
                  slug (e.g. <code>flutter</code>, <code>firebase</code>), an image URL, or a built-in icon:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ICON_NAMES.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setIcon(`lucide:${name}`)}
                      title={name}
                      aria-label={`Use ${name} icon`}
                      className="flex size-9 items-center justify-center rounded-lg border border-slate-200 hover:border-brand-400 hover:bg-brand-50"
                    >
                      <SkillIcon icon={`lucide:${name}`} name={name} className="size-4.5" />
                    </button>
                  ))}
                </div>
                <FieldError errors={e.icon} />
              </div>

              <CheckboxField name="visible" label="Visible" hint="Show on the public site." defaultChecked={skill?.visible ?? true} />
              <TextField
                name="sortOrder"
                label="Display order"
                type="number"
                hint="Lower numbers appear first."
                defaultValue={skill?.sortOrder ?? 0}
                errors={e.sortOrder}
              />
            </FormSection>
            <FormFooter state={state} pending={pending} cancelHref="/admin/skills" submitLabel={skill ? "Save changes" : "Create skill"} />
          </>
        );
      }}
    </ActionForm>
  );
}
