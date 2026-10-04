import { asc, desc } from "drizzle-orm";
import { EyeOff, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteTestimonial } from "@/app/actions/admin/testimonials";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const rows = await getDb().select().from(testimonials).orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Client feedback shown in the carousel."
        newHref="/admin/testimonials/new"
        newLabel="New testimonial"
      />
      {rows.length === 0 ? (
        <EmptyState>No testimonials yet.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {rows.map((t) => (
            <li key={t.id} className="card flex items-start gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-semibold text-ink">
                  {t.name}
                  {t.role && <span className="font-normal text-slate-500">· {t.role}</span>}
                  {!t.visible && <EyeOff className="size-3.5 text-slate-400" aria-label="Hidden" />}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{t.content}</p>
              </div>
              <Link href={`/admin/testimonials/${t.id}`} className="btn-ghost px-2.5" aria-label={`Edit testimonial from ${t.name}`}>
                <Pencil className="size-4" />
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmText={`Delete testimonial from "${t.name}"?`} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
