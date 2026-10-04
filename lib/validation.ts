import { z } from "zod";
import { ICON_NAMES } from "./icons";

const text = (max: number) => z.string().trim().max(max, `Must be ${max} characters or fewer`);
const required = (max: number) => text(max).min(1, "Required");

const url = z
  .string()
  .trim()
  .max(2000)
  .refine((v) => v === "" || /^\/(?!\/)/.test(v) || /^https?:\/\/[^\s]+$/i.test(v), "Must be a valid http(s) URL");

const sortOrder = z.coerce.number().int().min(-10000).max(10000).default(0);
const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required").max(200),
});

export const profileSchema = z.object({
  name: required(120),
  title: required(120),
  badge: text(80),
  headline: required(200),
  headlineHighlight: text(80),
  bio: text(1000),
  about: text(5000),
  heroNote: text(120),
  heroImageUrl: url,
  avatarUrl: url,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(200)]),
  phone: text(40),
  location: text(120),
  githubUrl: url,
  linkedinUrl: url,
  resumeUrl: url,
  ctaTitle: text(160),
  ctaText: text(1000),
  seoDescription: text(300),
});

export const statSchema = z.object({
  value: required(40),
  label: required(80),
  sortOrder,
});

export const skillSchema = z.object({
  name: required(80),
  icon: text(2000),
  category: text(80),
  sortOrder,
  visible: checkbox,
});

export const projectSchema = z.object({
  title: required(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes")
    .or(z.literal("")),
  category: text(120),
  summary: text(300),
  description: text(20000),
  coverImageUrl: url,
  logoUrl: url,
  techStack: text(500).transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20),
  ),
  appStoreUrl: url,
  playStoreUrl: url,
  githubUrl: url,
  liveUrl: url,
  featured: checkbox,
  published: checkbox,
  sortOrder,
});

export const testimonialSchema = z.object({
  name: required(120),
  role: text(160),
  content: required(2000),
  avatarUrl: url,
  rating: z.coerce.number().int().min(1).max(5).default(5),
  sortOrder,
  visible: checkbox,
});

export const serviceSchema = z.object({
  title: required(120),
  description: text(240),
  icon: z.enum(ICON_NAMES as [string, ...string[]]),
  sortOrder,
});

export const contactSchema = z.object({
  name: required(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  subject: text(200),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(5000),
  // Honeypot — real users never fill this hidden field.
  website: z.string().max(0).optional(),
});

export type FieldErrors = Record<string, string[] | undefined>;

export type ActionState = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors;
};

export function fieldErrors(error: z.ZodError): FieldErrors {
  return z.flattenError(error).fieldErrors as FieldErrors;
}
