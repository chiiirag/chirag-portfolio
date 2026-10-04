import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { SkillForm } from "../skill-form";

export const metadata: Metadata = { title: "New skill" };

export default async function NewSkillPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New skill" />
      <SkillForm />
    </>
  );
}
