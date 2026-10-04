import type { Metadata } from "next";
import { getMediaStats, listMedia } from "@/app/actions/admin/media";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { formatBytes } from "@/lib/media";
import { MediaLibrary } from "./media-library";

export const metadata: Metadata = { title: "Media" };

export default async function MediaPage() {
  await requireAdmin();
  const [items, stats] = await Promise.all([listMedia(), getMediaStats()]);

  return (
    <>
      <PageHeader
        title="Media library"
        description={`Images and PDFs stored in your Neon database · ${stats.count} file${stats.count === 1 ? "" : "s"}, ${formatBytes(stats.bytes)}`}
      />
      <MediaLibrary initialItems={items} />
    </>
  );
}
