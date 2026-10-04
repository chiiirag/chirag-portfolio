import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteExperience } from "@/app/actions/admin/experiences";
import { DeleteButton } from "@/components/admin/delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { experiences } from "@/lib/db/schema";
import { ExperienceForm } from "../experience-form";

export const metadata: Metadata = { title: "Edit experience" };

export default async function EditExperiencePage({ params }: PageProps<"/admin/experience/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const [experience] = await getDb().select().from(experiences).where(eq(experiences.id, id)).limit(1);
  if (!experience) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${experience.role}`}
        actions={
          <DeleteButton
            action={deleteExperience.bind(null, experience.id, true)}
            label="Delete"
            confirmText={`Delete "${experience.role}" at ${experience.company}?`}
          />
        }
      />
      <ExperienceForm experience={experience} />
    </>
  );
}
