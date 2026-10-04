import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { Project } from "@/lib/db/schema";
import { StoreIcons } from "./store-links";

// One gradient per card, assigned by position so neighbouring cards never share a colour.
// Full class names are listed so Tailwind includes them in the build.
const GRADIENTS = [
  "from-blue-600 via-indigo-600 to-violet-700",
  "from-emerald-500 via-teal-500 to-cyan-600",
  "from-orange-500 via-rose-500 to-pink-600",
  "from-violet-600 via-purple-600 to-fuchsia-600",
  "from-sky-500 via-blue-500 to-indigo-600",
  "from-amber-500 via-orange-500 to-red-500",
  "from-pink-500 via-fuchsia-500 to-purple-600",
  "from-teal-500 via-emerald-600 to-green-700",
];

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/projects/${project.slug}`;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={href}
        className={`relative block aspect-[4/3] overflow-hidden bg-gradient-to-br ${gradient}`}
        aria-label={`View ${project.title}`}
      >
        <span className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
        <span className="absolute -bottom-12 -left-8 size-36 rounded-full bg-black/10 blur-2xl" aria-hidden="true" />
      </Link>

      <div className="relative flex flex-1 flex-col p-5 pt-9">
        <div
          className={`absolute -top-7 left-5 flex size-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-white text-base font-bold shadow-md ${
            project.logoUrl ? "bg-white" : "bg-ink text-white"
          }`}
        >
          {project.logoUrl ? (
            <SmartImage src={project.logoUrl} alt="" width={56} height={56} className="h-full w-full object-contain" />
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
