import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { isImageType } from "@/lib/media";

// A file's bytes never change for a given id, so browsers and Vercel's CDN can cache it for a year.
const IMMUTABLE = "public, max-age=31536000, immutable";

export async function GET(request: NextRequest, ctx: RouteContext<"/media/[id]">) {
  const { id } = await ctx.params;
  if (!/^[a-f0-9]{24}$/.test(id)) return new Response("Not found", { status: 404 });

  const etag = `"${id}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag, "Cache-Control": IMMUTABLE } });
  }

  const [file] = await getDb()
    .select({ data: media.data, contentType: media.contentType, filename: media.filename })
    .from(media)
    .where(eq(media.id, id))
    .limit(1);

  if (!file) {
    return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, max-age=60" } });
  }

  const headers = new Headers({
    "Content-Type": file.contentType,
    "Content-Length": String(file.data.length),
    "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
    "Cache-Control": IMMUTABLE,
    "CDN-Cache-Control": "max-age=31536000",
    ETag: etag,
  });
  if (isImageType(file.contentType)) {
    headers.set("Content-Security-Policy", "default-src 'none'; sandbox");
  }

  return new Response(new Uint8Array(file.data), { headers });
}
