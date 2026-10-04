import { ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { Project } from "@/lib/db/schema";
import { StoreIcons } from "./store-links";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy via-brand-900 to-brand-700">
        {project.coverImageUrl ? (
          <SmartImage
            src={project.coverImageUrl}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Smartphone className="size-16 text-white/30" strokeWidth={1.2} aria-hidden="true" />
          </div>
        )}
      </Link>

      <div className="relative flex flex-1 flex-col p-5 pt-7">
        <div className="absolute -top-6 left-5 flex size-12 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-ink text-sm font-bold text-white shadow-md">
          {project.logoUrl ? (
            <SmartImage src={project.logoUrl} alt="" width={48} height={48} className="h-full w-full object-cover" />
          ) : (
            project.title.charAt(0).toUpperCase()
          )}
        </div>

        <h3 className="text-lg font-bold text-ink">
          <Link href={href} className="hover:text-brand-600">
            {project.title}
          </Link>
        </h3>
        {project.category && <p className="text-sm text-slate-600">{project.category}</p>}
        {project.summary && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">{project.summary}</p>}

        <div className="mt-auto flex items-center justify-between pt-5">
          <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            View Project <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <StoreIcons project={project} />
        </div>
      </div>
    </article>
  );
}
