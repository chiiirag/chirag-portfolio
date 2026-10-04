"use server";

import { randomBytes } from "node:crypto";
import { desc, eq, like, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { experiences, media, profile, projects, skills } from "@/lib/db/schema";
import { detectFileType } from "@/lib/file-type";
import { MAX_UPLOAD_BYTES, mediaIdFromUrl, mediaUrl, type MediaItem, type MediaKind } from "@/lib/media";

export type UploadResult = { item: MediaItem; error?: never } | { item?: never; error: string };
export type DeleteResult = { ok: true } | { ok: false; error: string };

const listColumns = {
  id: media.id,
  filename: media.filename,
  contentType: media.contentType,
  size: media.size,
  width: media.width,
  height: media.height,
  createdAt: media.createdAt,
};

type MediaRow = { [K in keyof typeof listColumns]: (typeof media.$inferSelect)[K] };

function toItem(row: MediaRow): MediaItem {
  return { ...row, url: mediaUrl(row.id), createdAt: row.createdAt.toISOString() };
}

function cleanFilename(name: string): string {
  const cleaned = name.replace(/[^\w.\- ]+/g, "").trim().slice(0, 200);
  return cleaned || "file";
}

function optionalDimension(value: FormDataEntryValue | null): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 && n <= 20000 ? n : null;
}

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file");
  const kind: MediaKind = formData.get("kind") === "document" ? "document" : "image";
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "File must be 4MB or smaller." };

  const data = Buffer.from(await file.arrayBuffer());
  const contentType = detectFileType(data);
  if (!contentType) return { error: "Unsupported file. Use PNG, JPG, WebP, GIF, AVIF or PDF." };
  if (kind === "image" && !contentType.startsWith("image/")) return { error: "Please choose an image file." };
  if (kind === "document" && contentType !== "application/pdf") return { error: "Please choose a PDF file." };

  try {
    const [row] = await getDb()
      .insert(media)
      .values({
        id: randomBytes(12).toString("hex"),
        filename: cleanFilename(file.name),
        contentType,
        size: data.length,
        width: optionalDimension(formData.get("width")),
        height: optionalDimension(formData.get("height")),
        data,
      })
      .returning(listColumns);
    revalidatePath("/admin/media");
    return { item: toItem(row) };
  } catch (error) {
    console.error("uploadMedia failed", error);
    return { error: "Upload failed. Please try again." };
  }
}

export async function listMedia(kind?: MediaKind): Promise<MediaItem[]> {
  await requireAdmin();
  const query = getDb().select(listColumns).from(media);
  const rows = await (kind === "document"
    ? query.where(eq(media.contentType, "application/pdf"))
    : kind === "image"
      ? query.where(like(media.contentType, "image/%"))
      : query
  )
    .orderBy(desc(media.createdAt))
    .limit(500);
  return rows.map(toItem);
}

/** Lists where a media URL is still referenced, so in-use files can't be deleted by accident. */
async function findUsage(url: string): Promise<string[]> {
  const db = getDb();
  const [profileRows, projectRows, skillRows, experienceRows] = await Promise.all([
    db
      .select({ id: profile.id })
      .from(profile)
      .where(or(eq(profile.avatarUrl, url), eq(profile.heroImageUrl, url), eq(profile.resumeUrl, url))),
    db
      .select({ title: projects.title })
      .from(projects)
      .where(or(eq(projects.coverImageUrl, url), eq(projects.logoUrl, url))),
    db.select({ name: skills.name }).from(skills).where(eq(skills.icon, url)),
    db.select({ company: experiences.company }).from(experiences).where(eq(experiences.logoUrl, url)),
  ]);

  return [
    ...profileRows.map(() => "Profile"),
    ...projectRows.map((r) => `Project “${r.title}”`),
    ...skillRows.map((r) => `Skill “${r.name}”`),
    ...experienceRows.map((r) => `Experience at ${r.company}`),
  ];
}

export async function deleteMedia(id: string): Promise<DeleteResult> {
  await requireAdmin();
  if (!mediaIdFromUrl(mediaUrl(String(id)))) return { ok: false, error: "Invalid file id." };

  const usage = await findUsage(mediaUrl(id));
  if (usage.length > 0) {
    return { ok: false, error: `This file is still used by: ${usage.join(", ")}. Replace it there first.` };
  }

  await getDb().delete(media).where(eq(media.id, id));
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function getMediaStats(): Promise<{ count: number; bytes: number }> {
  await requireAdmin();
  const [row] = await getDb()
    .select({ count: sql<number>`count(*)::int`, bytes: sql<number>`coalesce(sum(${media.size}), 0)::bigint` })
    .from(media);
  return { count: Number(row.count), bytes: Number(row.bytes) };
}
