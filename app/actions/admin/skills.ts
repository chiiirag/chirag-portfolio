"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { assertId, formToObject, GENERIC_ERROR } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { fieldErrors, skillSchema, type ActionState } from "@/lib/validation";

export async function saveSkill(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = skillSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  try {
    if (id === null) await getDb().insert(skills).values(parsed.data);
    else await getDb().update(skills).set(parsed.data).where(eq(skills.id, assertId(id)));
  } catch (error) {
    console.error("saveSkill failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  if (id === null) redirect("/admin/skills");
  return { ok: true, message: "Skill saved." };
}

export async function deleteSkill(id: number, redirectToList = false): Promise<void> {
  await requireAdmin();
  await getDb().delete(skills).where(eq(skills.id, assertId(id)));
  revalidateSite();
  if (redirectToList) redirect("/admin/skills");
}
