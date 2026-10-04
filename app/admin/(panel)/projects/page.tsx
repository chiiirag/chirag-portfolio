import { asc, desc } from "drizzle-orm";
import { ExternalLink, Pencil, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteProject } from "@/app/actions/admin/projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  await requireAdmin();
  const rows = await getDb().select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));

  return (
    <>
      <PageHeader title="Projects" description="Apps shown in your portfolio." newHref="/admin/projects/new" newLabel="New project" />
      {rows.length === 0 ? (
        <EmptyState>No projects yet. Create your first one.</EmptyState>
      ) : (
        <ul className="card divide-y divide-slate-100 overflow-hidden">
          {rows.map((project) => (
            <li key={project.id} className="flex items-center gap-4 p-4">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-navy to-brand-700">
                {(project.logoUrl || project.coverImageUrl) && (
                  <SmartImage src={project.logoUrl || project.coverImageUrl} alt="" fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate font-semibold text-ink">
                  {project.title}
                  {project.featured && <Star className="size-4 fill-amber-400 text-amber-400" aria-label="Featured" />}
                  {!project.published && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">Draft</span>
                  )}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {project.category || "—"} · order {project.sortOrder}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {project.published && (
                  <Link href={`/projects/${project.slug}`} target="_blank" className="btn-ghost px-2.5" aria-label="View on site">
                    <ExternalLink className="size-4" />
                  </Link>
                )}
                <Link href={`/admin/projects/${project.id}`} className="btn-ghost px-2.5" aria-label={`Edit ${project.title}`}>
                  <Pencil className="size-4" />
                </Link>
                <DeleteButton action={deleteProject.bind(null, project.id)} confirmText={`Delete "${project.title}"? This cannot be undone.`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
