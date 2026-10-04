import type { Metadata } from "next";
import {
  AboutSection,
  ContactSection,
  CtaCard,
  ExperienceSection,
  FeaturedProjects,
  Hero,
  ServicesStrip,
  SkillsCard,
} from "@/components/site/sections";
import { getFeaturedProjects, getProfile, getServices, getVisibleExperiences, getVisibleSkills } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

// Regenerated on demand by the admin panel; this is a safety-net refresh interval.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `${profile.name} — ${profile.title}`;
  const description = profile.seoDescription || profile.bio;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", url: "/", title, description, siteName: profile.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HomePage() {
  const [profile, skills, projects, services, experiences] = await Promise.all([
    getProfile(),
    getVisibleSkills(),
    getFeaturedProjects(),
    getServices(),
    getVisibleExperiences(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl(),
    ...(profile.email ? { email: profile.email } : {}),
    ...(profile.phone ? { telephone: profile.phone } : {}),
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
  };

  return (
    <div className="container-page space-y-6 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <Hero profile={profile} />
      <SkillsCard skills={skills} />

      <FeaturedProjects projects={projects} />
      <CtaCard profile={profile} />

      <ServicesStrip services={services} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <ContactSection profile={profile} />
    </div>
  );
}
