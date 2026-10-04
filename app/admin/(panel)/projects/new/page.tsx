import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "New project" };

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New project" />
      <ProjectForm uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
