"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { assertId, formToObject, GENERIC_ERROR } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { fieldErrors, serviceSchema, type ActionState } from "@/lib/validation";

export async function saveService(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = serviceSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  try {
    if (id === null) await getDb().insert(services).values(parsed.data);
    else await getDb().update(services).set(parsed.data).where(eq(services.id, assertId(id)));
  } catch (error) {
    console.error("saveService failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  if (id === null) redirect("/admin/services");
  return { ok: true, message: "Service saved." };
}

export async function deleteService(id: number, redirectToList = false): Promise<void> {
  await requireAdmin();
  await getDb().delete(services).where(eq(services.id, assertId(id)));
  revalidateSite();
  if (redirectToList) redirect("/admin/services");
}
