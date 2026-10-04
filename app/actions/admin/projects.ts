"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { assertId, formToObject, GENERIC_ERROR, isUniqueViolation } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { revalidateSite } from "@/lib/revalidate";
import { slugify } from "@/lib/utils";
import { fieldErrors, projectSchema, type ActionState } from "@/lib/validation";

export async function saveProject(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };

  const values = { ...parsed.data, slug: parsed.data.slug || slugify(parsed.data.title) };
  if (!values.slug) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: { slug: ["Enter a URL slug"] } };
  }

  try {
    if (id === null) await getDb().insert(projects).values(values);
    else await getDb().update(projects).set(values).where(eq(projects.id, assertId(id)));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, message: "Please fix the highlighted fields.", errors: { slug: ["Another project already uses this slug"] } };
    }
    console.error("saveProject failed", error);
    return { ok: false, message: GENERIC_ERROR };
  }

  revalidateSite();
  if (id === null) redirect("/admin/projects");
  return { ok: true, message: "Project saved." };
}

export async function deleteProject(id: number, redirectToList = false): Promise<void> {
  await requireAdmin();
  await getDb().delete(projects).where(eq(projects.id, assertId(id)));
  revalidateSite();
  if (redirectToList) redirect("/admin/projects");
}
