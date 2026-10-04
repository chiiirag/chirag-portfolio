import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteProject } from "@/app/actions/admin/projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const [project] = await getDb().select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${project.title}`}
        actions={
          <DeleteButton
            action={deleteProject.bind(null, project.id, true)}
            label="Delete"
            confirmText={`Delete "${project.title}"? This cannot be undone.`}
          />
        }
      />
      <ProjectForm project={project} uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
