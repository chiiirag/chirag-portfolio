import { ArrowRight, Briefcase, Download, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import Link from "next/link";
import { SkillIcon } from "@/components/ui/skill-icon";
import { SmartImage } from "@/components/ui/smart-image";
import { formatDuration, formatMonth } from "@/lib/dates";
import type { Experience, Profile, Project, Service, Skill, Stat } from "@/lib/db/schema";
import { DynamicIcon, GithubIcon, LinkedinIcon } from "@/lib/icons";
import { telHref, whatsappHref } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import { PhoneMockups } from "./phone-mockup";
import { ProjectCard } from "./project-card";

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function Hero({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  return (
    <section id="home" className="card relative scroll-mt-24 overflow-hidden p-6 sm:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0">
          {profile.badge && (
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-800">
              <SkillIcon icon="flutter" name="Flutter" className="size-4" />
              {profile.badge}
            </span>
          )}
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl xl:text-6xl">
            {profile.headline} {profile.headlineHighlight && <span className="text-brand-600">{profile.headlineHighlight}</span>}
          </h1>
          {profile.bio && <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{profile.bio}</p>}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#projects" className="btn-primary px-6 py-3">
              View My Projects <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/#contact" className="btn-outline px-6 py-3">
              Get in Touch
            </Link>
          </div>

          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 xl:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col-reverse">
                  <dt className="text-sm text-slate-500">{stat.label}</dt>
                  <dd className="flex items-center gap-1 text-3xl font-bold text-ink">
                    {stat.value}
                    {/satisfaction|rating/i.test(stat.label) && (
                      <Star className="size-6 fill-amber-400 text-amber-400" aria-hidden="true" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="relative min-w-0">
          {profile.heroNote && (
            <p className="absolute -top-2 right-0 z-10 hidden max-w-[10rem] rotate-[-4deg] text-right text-sm text-slate-700 italic xl:block">
              {profile.heroNote}
            </p>
          )}
          {profile.heroImageUrl ? (
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <SmartImage
                src={profile.heroImageUrl}
                alt={`${profile.name} app showcase`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          ) : (
            <PhoneMockups />
          )}
        </div>
      </div>
    </section>
  );
}

export function SkillsCard({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="card scroll-mt-24 p-6 sm:p-8">
      <SectionHeader
        eyebrow="Technologies"
        title="Skills & Technologies"
        subtitle="Tools and technologies I use to build modern mobile applications."
      />
      {skills.length > 0 ? (
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 px-2 py-4 text-center transition hover:border-brand-200 hover:bg-white hover:shadow-card"
              title={skill.category || undefined}
            >
              <SkillIcon icon={skill.icon} name={skill.name} />
              <span className="text-xs font-medium text-slate-700">{skill.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Skills coming soon.</p>
      )}
    </section>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="card scroll-mt-24 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Projects"
          subtitle="A selection of mobile apps I've built and contributed to."
        />
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View All Projects <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      {projects.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Projects coming soon.</p>
      )}
    </section>
  );
}

export function CtaCard({ profile }: { profile: Profile }) {
  return (
    <section className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-[#0f1f4d] to-brand-900 p-6 text-white shadow-card sm:p-10 md:flex-row md:items-center md:justify-between">
      <div className="absolute -top-16 -right-16 size-48 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-2xl">
        <span className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase">
          Let&apos;s work together
        </span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{profile.ctaTitle || "Have a Mobile App Idea?"}</h2>
        {profile.ctaText && <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{profile.ctaText}</p>}
      </div>
      <Link
        href="/#contact"
        className="btn relative shrink-0 self-start bg-white px-6 py-3 text-ink hover:bg-brand-50 md:self-auto"
      >
        Get in Touch <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function ServicesStrip({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section className="card p-6 sm:p-8" aria-label="What I offer">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.id} className="flex items-center gap-4">
            <DynamicIcon name={service.icon} className="size-9 shrink-0 text-brand-600" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-ink">{service.title}</h3>
              {service.description && <p className="text-xs text-slate-500">{service.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;
  return (
    <section id="experience" className="card scroll-mt-24 p-6 sm:p-10">
      <SectionHeader
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="Building and shipping mobile apps for product teams."
      />
      <ol className="relative mt-8 space-y-8 border-l-2 border-brand-100 pl-6 sm:pl-8">
        {experiences.map((exp) => (
          <li key={exp.id} className="relative">
            <span
              className="absolute top-1 -left-[calc(1.5rem+9px)] flex size-4 items-center justify-center rounded-full border-2 border-white bg-brand-600 ring-4 ring-brand-100 sm:-left-[calc(2rem+9px)]"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {exp.logoUrl ? (
                  <SmartImage src={exp.logoUrl} alt={`${exp.company} logo`} fill sizes="48px" className="object-contain p-1" />
                ) : (
                  <Briefcase className="size-5 text-brand-600" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold text-ink">{exp.role}</h3>
                  <p className="text-sm font-medium text-brand-700">
                    {formatMonth(exp.startDate)} – {exp.endDate ? formatMonth(exp.endDate) : "Present"}
                    <span className="font-normal text-slate-500"> · {formatDuration(exp.startDate, exp.endDate)}</span>
                  </p>
                </div>
                <p className="text-sm text-slate-700">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-brand-600"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span className="font-semibold">{exp.company}</span>
                  )}
                  {exp.employmentType && ` · ${exp.employmentType}`}
                </p>
                {(exp.location || exp.workMode) && (
                  <p className="text-xs text-slate-500">{[exp.location, exp.workMode].filter(Boolean).join(" · ")}</p>
                )}
                {exp.description && (
                  <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-slate-600">{exp.description}</p>
                )}
                {exp.skills.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills">
                    {exp.skills.map((skill) => (
                      <li key={skill} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="card scroll-mt-24 p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-brand-300 md:w-full">
          {profile.avatarUrl ? (
            <SmartImage src={profile.avatarUrl} alt={profile.name} fill sizes="220px" className="object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-6xl font-extrabold text-brand-700">
              {profile.name
                .split(" ")
                .map((part) => part.charAt(0))
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <SectionHeader eyebrow="About" title={`Hi, I'm ${profile.name}`} />
          <p className="mt-4 leading-relaxed whitespace-pre-line text-slate-600">{profile.about || profile.bio}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <GithubIcon className="size-4" /> GitHub
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            )}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Download className="size-4" /> Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ profile }: { profile: Profile }) {
  const items = [
    profile.email && { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: Phone, label: "Phone", value: profile.phone, href: telHref(profile.phone) },
    profile.phone && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: whatsappHref(profile.phone),
      external: true,
    },
    profile.location && { icon: MapPin, label: "Location", value: profile.location },
  ].filter(Boolean) as Array<{ icon: typeof Mail; label: string; value: string; href?: string; external?: boolean }>;

  return (
    <section id="contact" className="card scroll-mt-24 p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something great"
            subtitle="Tell me about your project and I'll get back to you within 24 hours."
          />
          <ul className="mt-8 space-y-4">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-semibold text-ink hover:text-brand-600"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
