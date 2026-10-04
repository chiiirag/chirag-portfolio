import { boolean, customType, index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "bytea",
});

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/** Single-row table (id = 1) holding site-wide profile & copy. */
export const profile = pgTable("profile", {
  id: integer("id").primaryKey().default(1),
  name: varchar("name", { length: 120 }).notNull(),
  title: varchar("title", { length: 120 }).notNull(),
  badge: varchar("badge", { length: 80 }).notNull().default(""),
  headline: varchar("headline", { length: 200 }).notNull(),
  headlineHighlight: varchar("headline_highlight", { length: 80 }).notNull().default(""),
  bio: text("bio").notNull().default(""),
  about: text("about").notNull().default(""),
  heroNote: varchar("hero_note", { length: 120 }).notNull().default(""),
  heroImageUrl: text("hero_image_url").notNull().default(""),
  avatarUrl: text("avatar_url").notNull().default(""),
  email: varchar("email", { length: 200 }).notNull().default(""),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  location: varchar("location", { length: 120 }).notNull().default(""),
  githubUrl: text("github_url").notNull().default(""),
  linkedinUrl: text("linkedin_url").notNull().default(""),
  resumeUrl: text("resume_url").notNull().default(""),
  ctaTitle: varchar("cta_title", { length: 160 }).notNull().default(""),
  ctaText: text("cta_text").notNull().default(""),
  seoDescription: varchar("seo_description", { length: 300 }).notNull().default(""),
  ...timestamps,
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 40 }).notNull(),
  label: varchar("label", { length: 80 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  /** Simple Icons slug (e.g. "flutter"), "lucide:<name>", or an image URL. */
  icon: text("icon").notNull().default(""),
  category: varchar("category", { length: 80 }).notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  ...timestamps,
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  category: varchar("category", { length: 120 }).notNull().default(""),
  summary: varchar("summary", { length: 300 }).notNull().default(""),
  description: text("description").notNull().default(""),
  coverImageUrl: text("cover_image_url").notNull().default(""),
  logoUrl: text("logo_url").notNull().default(""),
  techStack: text("tech_stack").array().notNull().default([]),
  appStoreUrl: text("app_store_url").notNull().default(""),
  playStoreUrl: text("play_store_url").notNull().default(""),
  githubUrl: text("github_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  description: varchar("description", { length: 240 }).notNull().default(""),
  icon: varchar("icon", { length: 40 }).notNull().default("rocket"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    subject: varchar("subject", { length: 200 }).notNull().default(""),
    message: text("message").notNull(),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // Contact-form rate limit lookup and the admin inbox listing.
    index("messages_email_created_at_idx").on(t.email, t.createdAt),
    index("messages_created_at_idx").on(t.createdAt.desc()),
  ],
);

/** Uploaded files (images, resume PDF) stored in Postgres and served from /media/<id>. */
export const media = pgTable(
  "media",
  {
    // Random, unguessable id; also used in the public URL.
    id: varchar("id", { length: 32 }).primaryKey(),
    filename: varchar("filename", { length: 200 }).notNull(),
    contentType: varchar("content_type", { length: 100 }).notNull(),
    size: integer("size").notNull(),
    width: integer("width"),
    height: integer("height"),
    data: bytea("data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("media_created_at_idx").on(t.createdAt.desc())],
);

export type Profile = typeof profile.$inferSelect;
export type Stat = typeof stats.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Media = Omit<typeof media.$inferSelect, "data">;
