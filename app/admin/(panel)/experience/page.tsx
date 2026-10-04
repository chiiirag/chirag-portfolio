import { desc, sql } from "drizzle-orm";
import { EyeOff, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteExperience } from "@/app/actions/admin/experiences";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { formatDuration, formatMonth } from "@/lib/dates";
import { getDb } from "@/lib/db";
import { experiences } from "@/lib/db/schema";

export const metadata: Metadata = { title: "Experience" };

export default async function AdminExperiencePage() {
  await requireAdmin();
  const rows = await getDb()
    .select()
    .from(experiences)
    .orderBy(sql`${experiences.endDate} desc nulls first`, desc(experiences.startDate));

  return (
    <>
      <PageHeader
        title="Experience"
        description="Your work history, shown as a timeline (newest first)."
        newHref="/admin/experience/new"
        newLabel="Add experience"
      />
      {rows.length === 0 ? (
        <EmptyState>No experience added yet.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {rows.map((exp) => (
            <li key={exp.id} className="card flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate font-semibold text-ink">
                  {exp.role}
                  {!exp.visible && <EyeOff className="size-3.5 text-slate-400" aria-label="Hidden" />}
                </p>
                <p className="truncate text-sm text-slate-600">
                  {exp.company}
                  {exp.employmentType && ` · ${exp.employmentType}`}
                </p>
                <p className="text-xs text-slate-500">
                  {formatMonth(exp.startDate)} – {exp.endDate ? formatMonth(exp.endDate) : "Present"} ·{" "}
                  {formatDuration(exp.startDate, exp.endDate)}
                </p>
              </div>
              <Link
                href={`/admin/experience/${exp.id}`}
                className="btn-ghost px-2.5"
                aria-label={`Edit ${exp.role} at ${exp.company}`}
              >
                <Pencil className="size-4" />
              </Link>
              <DeleteButton
                action={deleteExperience.bind(null, exp.id)}
                confirmText={`Delete "${exp.role}" at ${exp.company}?`}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
