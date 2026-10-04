"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { assertId } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";

export async function setMessageRead(id: number, read: boolean): Promise<void> {
  await requireAdmin();
  await getDb().update(messages).set({ read: Boolean(read) }).where(eq(messages.id, assertId(id)));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id: number): Promise<void> {
  await requireAdmin();
  await getDb().delete(messages).where(eq(messages.id, assertId(id)));
  revalidatePath("/admin", "layout");
}
