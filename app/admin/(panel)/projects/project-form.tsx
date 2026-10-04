"use client";

import { saveProject } from "@/app/actions/admin/projects";
import { CheckboxField, FormSection, TextAreaField, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ImageField } from "@/components/admin/image-field";
import { ActionForm } from "@/components/ui/action-form";
import type { Project } from "@/lib/db/schema";

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <ActionForm action={saveProject.bind(null, project?.id ?? null)} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Basics">
              <TextField name="title" label="Title" defaultValue={project?.title} errors={e.title} required maxLength={120} />
              <TextField
                name="slug"
                label="URL slug"
                hint="Leave empty to generate from the title."
                defaultValue={project?.slug}
                errors={e.slug}
                maxLength={140}
              />
              <TextField
                name="category"
                label="Category"
                placeholder="Food Delivery"
                defaultValue={project?.category}
                errors={e.category}
                maxLength={120}
              />
              <TextField
                name="techStack"
                label="Tech stack"
                hint="Comma separated, e.g. Flutter, Firebase, Stripe"
                defaultValue={project?.techStack.join(", ")}
                errors={e.techStack}
                maxLength={500}
              />
              <TextAreaField
                name="summary"
                label="Short summary"
                hint="Shown on project cards (max 300 characters)."
                defaultValue={project?.summary}
                errors={e.summary}
                rows={2}
                maxLength={300}
                className="sm:col-span-2"
              />
              <TextAreaField
                name="description"
                label="Full description"
                hint="Shown on the project page. Line breaks are preserved."
                defaultValue={project?.description}
                errors={e.description}
                rows={8}
                maxLength={20000}
                className="sm:col-span-2"
              />
            </FormSection>

            <FormSection title="Images">
              <ImageField name="coverImageUrl" label="Cover image" defaultValue={project?.coverImageUrl} errors={e.coverImageUrl} />
              <ImageField name="logoUrl" label="App logo" defaultValue={project?.logoUrl} errors={e.logoUrl} />
            </FormSection>

            <FormSection title="Links">
              <TextField name="appStoreUrl" label="App Store URL" type="url" defaultValue={project?.appStoreUrl} errors={e.appStoreUrl} />
              <TextField name="playStoreUrl" label="Google Play URL" type="url" defaultValue={project?.playStoreUrl} errors={e.playStoreUrl} />
              <TextField name="githubUrl" label="GitHub URL" type="url" defaultValue={project?.githubUrl} errors={e.githubUrl} />
              <TextField name="liveUrl" label="Website URL" type="url" defaultValue={project?.liveUrl} errors={e.liveUrl} />
            </FormSection>

            <FormSection title="Visibility">
              <CheckboxField name="published" label="Published" hint="Visible on the public site." defaultChecked={project?.published ?? true} />
              <CheckboxField name="featured" label="Featured" hint="Shown on the home page." defaultChecked={project?.featured ?? false} />
              <TextField
                name="sortOrder"
                label="Display order"
                type="number"
                hint="Lower numbers appear first."
                defaultValue={project?.sortOrder ?? 0}
                errors={e.sortOrder}
              />
            </FormSection>

            <FormFooter state={state} pending={pending} cancelHref="/admin/projects" submitLabel={project ? "Save changes" : "Create project"} />
          </>
        );
      }}
    </ActionForm>
  );
}
