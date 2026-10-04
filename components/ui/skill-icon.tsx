import { DynamicIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SmartImage } from "./smart-image";

/**
 * Renders a skill icon. `icon` may be:
 *  - an image URL (https://… or /path)
 *  - "lucide:<name>" for one of the curated line icons
 *  - a Simple Icons slug, e.g. "flutter" (https://simpleicons.org)
 */
export function SkillIcon({ icon, name, className }: { icon: string; name: string; className?: string }) {
  const value = icon.trim();

  if (!value || value.startsWith("lucide:")) {
    return (
      <DynamicIcon
        name={value.slice("lucide:".length)}
        className={cn("size-7 text-brand-600", className)}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    );
  }

  const src = /^(https?:)?\//.test(value) ? value : `https://cdn.simpleicons.org/${encodeURIComponent(value.toLowerCase())}`;

  return <SmartImage src={src} alt={`${name} logo`} width={28} height={28} className={cn("size-7 object-contain", className)} />;
}
