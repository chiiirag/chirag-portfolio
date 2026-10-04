"use client";

import { useState } from "react";
import { saveExperience } from "@/app/actions/admin/experiences";
import { CheckboxField, FormSection, SelectField, TextAreaField, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ImageField } from "@/components/admin/image-field";
import { ActionForm } from "@/components/ui/action-form";
import { FieldError } from "@/components/ui/field-error";
import { toMonthInput } from "@/lib/dates";
import type { Experience } from "@/lib/db/schema";

const employmentTypes = ["", "Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((v) => ({
  value: v,
  label: v || "—",
}));
const workModes = ["", "On-site", "Hybrid", "Remote"].map((v) => ({ value: v, label: v || "—" }));

export function ExperienceForm({ experience }: { experience?: Experience }) {
  const [current, setCurrent] = useState(experience ? experience.endDate === null : false);

  return (
    <ActionForm action={saveExperience.bind(null, experience?.id ?? null)} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Role">
              <TextField
                name="role"
                label="Job title"
                placeholder="Senior Flutter Developer"
                defaultValue={experience?.role}
                errors={e.role}
                required
                maxLength={120}
              />
              <TextField
                name="company"
                label="Company"
                defaultValue={experience?.company}
                errors={e.company}
                required
                maxLength={120}
              />
              <SelectField
                name="employmentType"
                label="Employment type"
                defaultValue={experience?.employmentType ?? "Full-time"}
                options={employmentTypes}
                errors={e.employmentType}
              />
              <SelectField
                name="workMode"
                label="Work mode"
                defaultValue={experience?.workMode ?? ""}
                options={workModes}
                errors={e.workMode}
              />
              <TextField
                name="location"
                label="Location"
                placeholder="Surat, Gujarat, India"
                defaultValue={experience?.location}
                errors={e.location}
                maxLength={120}
              />
              <TextField
                name="companyUrl"
                label="Company website"
                type="url"
                defaultValue={experience?.companyUrl}
                errors={e.companyUrl}
              />
              <ImageField
                name="logoUrl"
                label="Company logo"
                defaultValue={experience?.logoUrl}
                errors={e.logoUrl}
                className="sm:col-span-2"
              />
            </FormSection>

            <FormSection title="Dates">
              <TextField
                name="startMonth"
                label="Start month"
                type="month"
                defaultValue={toMonthInput(experience?.startDate)}
                errors={e.startMonth}
                required
              />
              <div>
                <label htmlFor="endMonth" className="label">
                  End month
                </label>
                <input
                  id="endMonth"
                  name="endMonth"
                  type="month"
                  defaultValue={toMonthInput(experience?.endDate)}
                  disabled={current}
                  className="input"
                />
                <FieldError errors={e.endMonth} />
              </div>
              <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  onChange={(event) => setCurrent(event.target.checked)}
                  className="size-4 rounded border-slate-300 accent-brand-600"
                />
                <span className="text-sm font-medium text-slate-800">I currently work here</span>
              </label>
            </FormSection>

            <FormSection title="Details">
              <TextAreaField
                name="description"
                label="What you did"
                hint="Line breaks are kept. Start lines with • for bullet points."
                defaultValue={experience?.description}
                errors={e.description}
                rows={6}
                maxLength={5000}
                className="sm:col-span-2"
              />
              <TextField
                name="skills"
                label="Skills"
                hint="Comma separated, e.g. Flutter, BLoC, Firebase"
                defaultValue={experience?.skills.join(", ")}
                errors={e.skills}
                maxLength={500}
                className="sm:col-span-2"
              />
              <CheckboxField
                name="visible"
                label="Visible"
                hint="Show on the public site."
                defaultChecked={experience?.visible ?? true}
              />
            </FormSection>

            <FormFooter
              state={state}
              pending={pending}
              cancelHref="/admin/experience"
              submitLabel={experience ? "Save changes" : "Add experience"}
            />
          </>
        );
      }}
    </ActionForm>
  );
}
