import { Mail, Phone } from "lucide-react";
import type { Profile } from "@/lib/db/schema";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";
import { telHref } from "@/lib/utils";

const iconLink = "flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-brand-400 hover:text-brand-600";

export function Footer({ profile, year }: { profile: Profile; year: number }) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub">
              <GithubIcon className="size-4" />
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn">
              <LinkedinIcon className="size-4" />
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className={iconLink} aria-label="Email">
              <Mail className="size-4" />
            </a>
          )}
          {profile.phone && (
            <a href={telHref(profile.phone)} className={iconLink} aria-label="Phone">
              <Phone className="size-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
