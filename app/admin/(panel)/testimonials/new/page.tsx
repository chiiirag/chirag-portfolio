import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "New testimonial" };

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New testimonial" />
      <TestimonialForm uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
