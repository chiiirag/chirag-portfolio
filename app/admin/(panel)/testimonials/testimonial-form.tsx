"use client";

import { saveTestimonial } from "@/app/actions/admin/testimonials";
import { CheckboxField, FormSection, SelectField, TextAreaField, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ImageField } from "@/components/admin/image-field";
import { ActionForm } from "@/components/ui/action-form";
import type { Testimonial } from "@/lib/db/schema";

const ratingOptions = [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} star${n > 1 ? "s" : ""}` }));

export function TestimonialForm({ testimonial, uploadsEnabled }: { testimonial?: Testimonial; uploadsEnabled: boolean }) {
  return (
    <ActionForm action={saveTestimonial.bind(null, testimonial?.id ?? null)} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Testimonial">
              <TextField name="name" label="Client name" defaultValue={testimonial?.name} errors={e.name} required maxLength={120} />
              <TextField
                name="role"
                label="Role / company"
                placeholder="Product Founder"
                defaultValue={testimonial?.role}
                errors={e.role}
                maxLength={160}
              />
              <TextAreaField
                name="content"
                label="Quote"
                defaultValue={testimonial?.content}
                errors={e.content}
                required
                rows={5}
                maxLength={2000}
                className="sm:col-span-2"
              />
              <ImageField name="avatarUrl" label="Photo" defaultValue={testimonial?.avatarUrl} errors={e.avatarUrl} uploadsEnabled={uploadsEnabled} />
              <SelectField name="rating" label="Rating" defaultValue={String(testimonial?.rating ?? 5)} options={ratingOptions} errors={e.rating} />
              <CheckboxField name="visible" label="Visible" hint="Show on the public site." defaultChecked={testimonial?.visible ?? true} />
              <TextField
                name="sortOrder"
                label="Display order"
                type="number"
                defaultValue={testimonial?.sortOrder ?? 0}
                errors={e.sortOrder}
              />
            </FormSection>
            <FormFooter
              state={state}
              pending={pending}
              cancelHref="/admin/testimonials"
              submitLabel={testimonial ? "Save changes" : "Create testimonial"}
            />
          </>
        );
      }}
    </ActionForm>
  );
}
