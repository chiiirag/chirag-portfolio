import "server-only";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "./db";
import { experiences, profile, projects, services, skills, type Profile } from "./db/schema";
import { defaultProfile } from "./defaults";

// Public, read-only queries. Pages using these are statically generated and
// re-generated on demand when the admin panel calls revalidatePath().

export const getProfile = cache(async (): Promise<Profile> => {
  const [row] = await getDb().select().from(profile).where(eq(profile.id, 1)).limit(1);
  if (row) return row;
  const now = new Date();
  return { id: 1, ...defaultProfile, createdAt: now, updatedAt: now };
});

export const getVisibleSkills = cache(async () =>
  getDb().select().from(skills).where(eq(skills.visible, true)).orderBy(asc(skills.sortOrder), asc(skills.id)),
);

export const getFeaturedProjects = cache(async () =>
  getDb()
    .select()
    .from(projects)
    .where(and(eq(projects.published, true), eq(projects.featured, true)))
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt))
    .limit(8),
);

export const getPublishedProjects = cache(async () =>
  getDb().select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder), desc(projects.createdAt)),
);

export const getProjectBySlug = cache(async (slug: string) => {
  const [row] = await getDb()
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .limit(1);
  return row ?? null;
});

export const getServices = cache(async () => getDb().select().from(services).orderBy(asc(services.sortOrder), asc(services.id)));

export const getVisibleExperiences = cache(async () =>
  getDb()
    .select()
    .from(experiences)
    .where(eq(experiences.visible, true))
    .orderBy(sql`${experiences.endDate} desc nulls first`, desc(experiences.startDate)),
);
