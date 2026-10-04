import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { ExperienceForm } from "../experience-form";

export const metadata: Metadata = { title: "Add experience" };

export default async function NewExperiencePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="Add experience" />
      <ExperienceForm />
    </>
  );
}
