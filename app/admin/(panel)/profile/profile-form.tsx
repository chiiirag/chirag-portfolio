"use client";

import { updateProfile } from "@/app/actions/admin/profile";
import { FormSection, TextAreaField, TextField } from "@/components/admin/fields";
import { FormFooter } from "@/components/admin/form-footer";
import { ImageField } from "@/components/admin/image-field";
import { ActionForm } from "@/components/ui/action-form";
import type { Profile } from "@/lib/db/schema";

export function ProfileForm({ profile, uploadsEnabled }: { profile: Profile; uploadsEnabled: boolean }) {
  return (
    <ActionForm action={updateProfile} className="space-y-6">
      {(state, pending) => {
        const e = state.errors ?? {};
        return (
          <>
            <FormSection title="Identity">
              <TextField name="name" label="Name" defaultValue={profile.name} errors={e.name} required maxLength={120} />
              <TextField name="title" label="Title" defaultValue={profile.title} errors={e.title} required maxLength={120} />
              <ImageField
                name="avatarUrl"
                label="Profile photo"
                defaultValue={profile.avatarUrl}
                errors={e.avatarUrl}
                uploadsEnabled={uploadsEnabled}
                className="sm:col-span-2"
              />
            </FormSection>

            <FormSection title="Hero section" description="The first thing visitors see.">
              <TextField name="badge" label="Badge" defaultValue={profile.badge} errors={e.badge} maxLength={80} />
              <TextField name="heroNote" label="Handwritten note" defaultValue={profile.heroNote} errors={e.heroNote} maxLength={120} />
              <TextField
                name="headline"
                label="Headline"
                defaultValue={profile.headline}
                errors={e.headline}
                required
                maxLength={200}
                className="sm:col-span-2"
              />
              <TextField
                name="headlineHighlight"
                label="Highlighted word(s)"
                hint="Shown in blue at the end of the headline."
                defaultValue={profile.headlineHighlight}
                errors={e.headlineHighlight}
                maxLength={80}
              />
              <ImageField
                name="heroImageUrl"
                label="Hero image"
                hint="Optional. Leave empty to show the built-in phone mockups."
                defaultValue={profile.heroImageUrl}
                errors={e.heroImageUrl}
                uploadsEnabled={uploadsEnabled}
              />
              <TextAreaField name="bio" label="Intro" defaultValue={profile.bio} errors={e.bio} rows={3} maxLength={1000} className="sm:col-span-2" />
            </FormSection>

            <FormSection title="About">
              <TextAreaField name="about" label="About me" defaultValue={profile.about} errors={e.about} rows={6} maxLength={5000} className="sm:col-span-2" />
              <ImageField
                name="resumeUrl"
                label="Resume (PDF)"
                kind="document"
                defaultValue={profile.resumeUrl}
                errors={e.resumeUrl}
                uploadsEnabled={uploadsEnabled}
                className="sm:col-span-2"
              />
            </FormSection>

            <FormSection title="Contact & social">
              <TextField name="email" label="Email" type="email" defaultValue={profile.email} errors={e.email} maxLength={200} />
              <TextField name="phone" label="Phone" type="tel" defaultValue={profile.phone} errors={e.phone} maxLength={40} />
              <TextField name="location" label="Location" defaultValue={profile.location} errors={e.location} maxLength={120} />
              <TextField name="githubUrl" label="GitHub URL" type="url" defaultValue={profile.githubUrl} errors={e.githubUrl} />
              <TextField name="linkedinUrl" label="LinkedIn URL" type="url" defaultValue={profile.linkedinUrl} errors={e.linkedinUrl} />
            </FormSection>

            <FormSection title="Call to action & SEO">
              <TextField name="ctaTitle" label="CTA title" defaultValue={profile.ctaTitle} errors={e.ctaTitle} maxLength={160} />
              <TextAreaField name="ctaText" label="CTA text" defaultValue={profile.ctaText} errors={e.ctaText} rows={2} maxLength={1000} />
              <TextAreaField
                name="seoDescription"
                label="SEO description"
                hint="Used for search results and link previews (max 300 characters)."
                defaultValue={profile.seoDescription}
                errors={e.seoDescription}
                rows={2}
                maxLength={300}
                className="sm:col-span-2"
              />
            </FormSection>

            <FormFooter state={state} pending={pending} />
          </>
        );
      }}
    </ActionForm>
  );
}
