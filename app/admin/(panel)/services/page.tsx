import { asc } from "drizzle-orm";
import { Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteService } from "@/app/actions/admin/services";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { DynamicIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Services" };

export default async function AdminServicesPage() {
  await requireAdmin();
  const rows = await getDb().select().from(services).orderBy(asc(services.sortOrder), asc(services.id));

  return (
    <>
      <PageHeader
        title="Services"
        description="The highlights strip near the bottom of the home page."
        newHref="/admin/services/new"
        newLabel="New service"
      />
      {rows.length === 0 ? (
        <EmptyState>No services yet.</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map((service) => (
            <li key={service.id} className="card flex items-center gap-3 p-4">
              <DynamicIcon name={service.icon} className="size-7 shrink-0 text-brand-600" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{service.title}</p>
                <p className="truncate text-xs text-slate-500">{service.description}</p>
              </div>
              <Link href={`/admin/services/${service.id}`} className="btn-ghost px-2.5" aria-label={`Edit ${service.title}`}>
                <Pencil className="size-4" />
              </Link>
              <DeleteButton action={deleteService.bind(null, service.id)} confirmText={`Delete "${service.title}"?`} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
