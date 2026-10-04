export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

export function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

/** True for raster images on hosts configured in next.config.ts `images.remotePatterns`. */
export function canOptimizeImage(src: string): boolean {
  try {
    const { hostname, pathname } = new URL(src, "http://local");
    if (pathname.toLowerCase().endsWith(".svg")) return false;
    return (src.startsWith("/") && !src.startsWith("//")) || hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return (fromEnv || "http://localhost:3000").replace(/\/+$/, "");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
