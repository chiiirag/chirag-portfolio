import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteSkill } from "@/app/actions/admin/skills";
import { DeleteButton } from "@/components/admin/delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { SkillForm } from "../skill-form";

export const metadata: Metadata = { title: "Edit skill" };

export default async function EditSkillPage({ params }: PageProps<"/admin/skills/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const [skill] = await getDb().select().from(skills).where(eq(skills.id, id)).limit(1);
  if (!skill) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${skill.name}`}
        actions={<DeleteButton action={deleteSkill.bind(null, skill.id, true)} label="Delete" confirmText={`Delete "${skill.name}"?`} />}
      />
      <SkillForm skill={skill} />
    </>
  );
}
