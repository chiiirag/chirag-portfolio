import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteService } from "@/app/actions/admin/services";
import { DeleteButton } from "@/components/admin/delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { ServiceForm } from "../service-form";

export const metadata: Metadata = { title: "Edit service" };

export default async function EditServicePage({ params }: PageProps<"/admin/services/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const [service] = await getDb().select().from(services).where(eq(services.id, id)).limit(1);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${service.title}`}
        actions={<DeleteButton action={deleteService.bind(null, service.id, true)} label="Delete" confirmText={`Delete "${service.title}"?`} />}
      />
      <ServiceForm service={service} />
    </>
  );
}
