"use server";

import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth/session";
import { slugify } from "@/lib/utils";

const MAX_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]);
const DOCUMENT_TYPES = new Set(["application/pdf"]);

export type UploadResult = { url: string; error?: never } | { url?: never; error: string };

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Uploads are not configured. Connect a Vercel Blob store or paste a URL instead." };
  }

  const file = formData.get("file");
  const kind = formData.get("kind") === "document" ? "document" : "image";
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };
  if (file.size > MAX_BYTES) return { error: "File must be 4MB or smaller." };

  const allowed = kind === "document" ? DOCUMENT_TYPES : IMAGE_TYPES;
  if (!allowed.has(file.type)) {
    return { error: kind === "document" ? "Only PDF files are allowed." : "Use a PNG, JPG, WebP, GIF or AVIF image." };
  }

  const dot = file.name.lastIndexOf(".");
  const base = slugify(dot > 0 ? file.name.slice(0, dot) : file.name) || "file";
  const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  try {
    const blob = await put(`portfolio/${base}${ext ? `.${ext}` : ""}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return { url: blob.url };
  } catch (error) {
    console.error("Blob upload failed", error);
    return { error: "Upload failed. Please try again." };
  }
}
