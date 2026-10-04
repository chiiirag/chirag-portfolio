"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { assertId, formToObject, GENERIC_ERROR } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { fieldErrors, testimonialSchema, type ActionState } from "@/lib/validation";

export async function saveTestimonial(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = testimonialSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  try {
    if (id === null) await getDb().insert(testimonials).values(parsed.data);
    else await getDb().update(testimonials).set(parsed.data).where(eq(testimonials.id, assertId(id)));
  } catch (error) {
    console.error("saveTestimonial failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  if (id === null) redirect("/admin/testimonials");
  return { ok: true, message: "Testimonial saved." };
}

export async function deleteTestimonial(id: number, redirectToList = false): Promise<void> {
  await requireAdmin();
  await getDb().delete(testimonials).where(eq(testimonials.id, assertId(id)));
  revalidateSite();
  if (redirectToList) redirect("/admin/testimonials");
}
