import { asc } from "drizzle-orm";
import { EyeOff, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteSkill } from "@/app/actions/admin/skills";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { SkillIcon } from "@/components/ui/skill-icon";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { skills } from "@/lib/db/schema";

export const metadata: Metadata = { title: "Skills" };

export default async function AdminSkillsPage() {
  await requireAdmin();
  const rows = await getDb().select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id));

  return (
    <>
      <PageHeader title="Skills" description="Technologies shown in the skills grid." newHref="/admin/skills/new" newLabel="New skill" />
      {rows.length === 0 ? (
        <EmptyState>No skills yet.</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map((skill) => (
            <li key={skill.id} className="card flex items-center gap-3 p-3 pl-4">
              <SkillIcon icon={skill.icon} name={skill.name} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate font-semibold text-ink">
                  {skill.name}
                  {!skill.visible && <EyeOff className="size-3.5 text-slate-400" aria-label="Hidden" />}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {skill.category || "—"} · order {skill.sortOrder}
                </p>
              </div>
              <Link href={`/admin/skills/${skill.id}`} className="btn-ghost px-2.5" aria-label={`Edit ${skill.name}`}>
                <Pencil className="size-4" />
              </Link>
              <DeleteButton action={deleteSkill.bind(null, skill.id)} confirmText={`Delete "${skill.name}"?`} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
