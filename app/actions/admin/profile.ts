"use server";

import { formToObject, GENERIC_ERROR } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { profile } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { fieldErrors, profileSchema, type ActionState } from "@/lib/validation";

export async function updateProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = profileSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  try {
    await getDb()
      .insert(profile)
      .values({ id: 1, ...parsed.data })
      .onConflictDoUpdate({ target: profile.id, set: { ...parsed.data, updatedAt: new Date() } });
  } catch (error) {
    console.error("updateProfile failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  return { ok: true, message: "Profile saved." };
}
