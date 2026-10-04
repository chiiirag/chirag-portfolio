import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const projects = await getPublishedProjects();

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
