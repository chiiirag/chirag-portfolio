import type { SVGProps } from "react";
import type { Project } from "@/lib/db/schema";
import { GithubIcon } from "@/lib/icons";

function AppStoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#1f7cf7" />
      <path
        d="M9.6 16.8H6.4m11.2 0h-3.2m-5.1-2.6 4.2-7.4m-2.2 3.9 3.4 6.1M12 10.7 9.9 6.8"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function PlayStoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 2.8v18.4c0 .5.5.8.9.6L13.4 12 4.9 2.2c-.4-.2-.9.1-.9.6Z" fill="#00d7fe" />
      <path d="m13.4 12 3-3.3L6 2.6a1 1 0 0 0-1.1-.4L13.4 12Z" fill="#00f076" />
      <path d="m13.4 12-8.5 9.8c.3.2.7.2 1.1 0l10.4-6.5-3-3.3Z" fill="#ff3a44" />
      <path d="m16.4 8.7-3 3.3 3 3.3 3.3-2.1c.7-.4.7-1.4 0-1.8l-3.3-2.7Z" fill="#ffd400" />
    </svg>
  );
}

const linkClass = "rounded-lg transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand-600";

export function StoreIcons({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2">
      {project.appStoreUrl && (
        <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} on the App Store`}>
          <AppStoreIcon className="size-7" />
        </a>
      )}
      {project.playStoreUrl && (
        <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} on Google Play`}>
          <PlayStoreIcon className="size-7" />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} source on GitHub`}>
          <GithubIcon className="size-6 text-ink" />
        </a>
      )}
    </div>
  );
}
