import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteTestimonial } from "@/app/actions/admin/testimonials";
import { DeleteButton } from "@/components/admin/delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "Edit testimonial" };

export default async function EditTestimonialPage({ params }: PageProps<"/admin/testimonials/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const [testimonial] = await getDb().select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  if (!testimonial) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${testimonial.name}`}
        actions={
          <DeleteButton
            action={deleteTestimonial.bind(null, testimonial.id, true)}
            label="Delete"
            confirmText={`Delete testimonial from "${testimonial.name}"?`}
          />
        }
      />
      <TestimonialForm testimonial={testimonial} uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
