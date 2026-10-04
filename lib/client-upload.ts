"use client";

import { uploadMedia, type UploadResult } from "@/app/actions/admin/media";
import { MAX_UPLOAD_BYTES, type MediaKind } from "./media";

const MAX_DIMENSION = 2000;
const RESIZE_ABOVE_BYTES = 1.5 * 1024 * 1024;

type Prepared = { blob: Blob; name: string; width: number | null; height: number | null };

function renameExtension(name: string, ext: string): string {
  const dot = name.lastIndexOf(".");
  return `${dot > 0 ? name.slice(0, dot) : name}.${ext}`;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Downscales large photos (max 2000px, WebP/JPEG) in the browser before upload. GIFs are kept as-is to preserve animation. */
async function prepareImage(file: File): Promise<Prepared> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Format the browser can't decode (e.g. AVIF on older Safari): upload unchanged.
    return { blob: file, name: file.name, width: null, height: null };
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  const needsResize = scale < 1 || file.size > RESIZE_ABOVE_BYTES;

  if (file.type === "image/gif" || !needsResize) {
    bitmap.close();
    return { blob: file, name: file.name, width, height };
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // Safari < 17 can't encode WebP and silently returns PNG; fall back to JPEG then.
  let blob = await canvasToBlob(canvas, "image/webp", 0.85);
  let ext = "webp";
  if (!blob || blob.type !== "image/webp") {
    blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
    ext = "jpg";
  }
  if (!blob) return { blob: file, name: file.name, width, height };

  return { blob, name: renameExtension(file.name, ext), width: canvas.width, height: canvas.height };
}

/** Prepares and uploads one file to the media library (stored in Neon). */
export async function uploadToLibrary(file: File, kind: MediaKind): Promise<UploadResult> {
  const prepared = kind === "image" ? await prepareImage(file) : { blob: file, name: file.name, width: null, height: null };

  if (prepared.blob.size > MAX_UPLOAD_BYTES) {
    return { error: `“${file.name}” is larger than 4MB even after compression. Please use a smaller file.` };
  }

  const data = new FormData();
  data.set("file", prepared.blob, prepared.name);
  data.set("kind", kind);
  if (prepared.width) data.set("width", String(prepared.width));
  if (prepared.height) data.set("height", String(prepared.height));

  try {
    return await uploadMedia(data);
  } catch {
    return { error: "Upload failed. Check your connection and try again." };
  }
}
