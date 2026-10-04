import type { Metadata } from "next";
import { ProjectCard } from "@/components/site/project-card";
import { getPublishedProjects } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "Mobile apps I've designed, built and shipped with Flutter.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="container-page py-10 sm:py-14">
      <span className="eyebrow">Portfolio</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">All Projects</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Mobile apps I&apos;ve designed, built and shipped.</p>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="card mt-10 p-10 text-center text-slate-500">No projects published yet.</p>
      )}
    </div>
  );
}
