import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
