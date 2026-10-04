// Shared by the admin UI (client) and the server: keep this file free of server-only imports.

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // Vercel functions accept bodies up to 4.5MB.

export const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/avif";
export const DOCUMENT_ACCEPT = "application/pdf";

export type MediaKind = "image" | "document";

export type MediaItem = {
  id: string;
  url: string;
  filename: string;
  contentType: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: string;
};

export function mediaUrl(id: string): string {
  return `/media/${id}`;
}

/** Extracts the media id from a /media/<id> URL, or null for any other URL. */
export function mediaIdFromUrl(url: string): string | null {
  const match = /^\/media\/([a-f0-9]{24})$/.exec(url.trim());
  return match ? match[1] : null;
}

export function isImageType(contentType: string): boolean {
  return contentType.startsWith("image/");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
