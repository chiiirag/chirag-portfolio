"use server";

import { eq } from "drizzle-orm";
import { assertId, formToObject, GENERIC_ERROR } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { stats } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { fieldErrors, statSchema, type ActionState } from "@/lib/validation";

export async function saveStat(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = statSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  try {
    if (id === null) await getDb().insert(stats).values(parsed.data);
    else await getDb().update(stats).set(parsed.data).where(eq(stats.id, assertId(id)));
  } catch (error) {
    console.error("saveStat failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  return { ok: true, message: id === null ? "Stat added." : "Stat saved." };
}

export async function deleteStat(id: number): Promise<void> {
  await requireAdmin();
  await getDb().delete(stats).where(eq(stats.id, assertId(id)));
  revalidateSite();
}
