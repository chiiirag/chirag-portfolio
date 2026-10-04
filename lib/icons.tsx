import {
  Bell,
  Brain,
  Cloud,
  Code,
  CreditCard,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
  Plug,
  Rocket,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  TestTube,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement, type SVGProps } from "react";

/** Curated icon set selectable from the admin panel (services & "lucide:<name>" skill icons). */
export const ICONS = {
  rocket: Rocket,
  settings: Settings,
  smartphone: Smartphone,
  users: Users,
  code: Code,
  plug: Plug,
  bell: Bell,
  "shopping-cart": ShoppingCart,
  workflow: Workflow,
  "map-pin": MapPin,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  zap: Zap,
  palette: Palette,
  layers: Layers,
  cpu: Cpu,
  globe: Globe,
  "credit-card": CreditCard,
  "git-branch": GitBranch,
  brain: Brain,
  gauge: Gauge,
  "test-tube": TestTube,
  wrench: Wrench,
  "message-circle": MessageCircle,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function getIcon(name: string): LucideIcon {
  return (ICONS as Record<string, LucideIcon>)[name] ?? Code;
}

/** Renders a curated icon by name, falling back to a generic code icon. */
export function DynamicIcon({ name, ...props }: LucideProps & { name: string }) {
  return createElement(getIcon(name), props);
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
