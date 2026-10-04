import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreIcons } from "@/components/site/store-links";
import { SmartImage } from "@/components/ui/smart-image";
import { getProjectBySlug, getPublishedProjects } from "@/lib/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const description = project.summary || `${project.title} — ${project.category}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      url: `/projects/${project.slug}`,
      ...(project.coverImageUrl ? { images: [project.coverImageUrl] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const hasLinks = project.appStoreUrl || project.playStoreUrl || project.githubUrl;

  return (
    <article className="container-page py-10 sm:py-14">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600">
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-700 shadow-card">
          {project.coverImageUrl && (
            <SmartImage
              src={project.coverImageUrl}
              alt={`${project.title} screenshot`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div>
          {project.category && <span className="eyebrow">{project.category}</span>}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{project.title}</h1>
          {project.summary && <p className="mt-4 text-lg leading-relaxed text-slate-600">{project.summary}</p>}

          {project.techStack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {(hasLinks || project.liveUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Visit Website <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
              {hasLinks && <StoreIcons project={project} />}
            </div>
          )}
        </div>
      </div>

      {project.description && (
        <section className="card mt-10 p-6 sm:p-10">
          <h2 className="text-xl font-bold text-ink">About the project</h2>
          <div className="mt-4 leading-relaxed whitespace-pre-line text-slate-600">{project.description}</div>
        </section>
      )}
    </article>
  );
}
