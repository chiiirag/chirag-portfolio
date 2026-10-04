import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { ServiceForm } from "../service-form";

export const metadata: Metadata = { title: "New service" };

export default async function NewServicePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New service" />
      <ServiceForm />
    </>
  );
}
