# Chirag Dafda — Portfolio

Personal portfolio with a built-in admin panel. Next.js 16 (App Router), Tailwind CSS v4, Drizzle ORM and Neon Postgres. Deploys to Vercel.

- **Public site** — `/`, `/projects`, `/projects/[slug]`. Pages are statically generated and regenerated as soon as content changes in the admin panel.
- **Admin panel** — `/admin`. Manage the profile, hero stats, projects, skills, testimonials and services, and read contact-form messages.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Add the same values in **Vercel → Project → Settings → Environment Variables**.

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | Neon **pooled** connection string |
| `ADMIN_EMAIL` | ✅ | Email used to sign in at `/admin/login` |
| `ADMIN_PASSWORD_HASH` | ✅ | Generate with `npm run hash-password` |
| `SESSION_SECRET` | ✅ | Random string, 32+ chars (`openssl rand -base64 48`) |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public URL without trailing slash, e.g. `https://chiragdafda.vercel.app` |
| `BLOB_READ_WRITE_TOKEN` | optional | Enables image/PDF uploads (Vercel Blob). Without it, paste image URLs instead. |

## Local development

```bash
npm install
npm run db:migrate  # apply migrations in drizzle/ to your Neon database
npm run db:seed     # starter content (safe to re-run; it never overwrites your edits)
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin.

## Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables above (Production + Preview).
3. Optional: **Storage → Create → Blob**, then connect it to the project to enable uploads.
4. Run `npm run db:migrate` (and `db:seed` once) against the Neon database **before the first deploy**, because the build pre-renders pages from the database.
5. Deploy.

## Database migrations

Migrations are SQL files in `drizzle/`, generated from `lib/db/schema.ts` and committed to git. Applied migrations are tracked in the `drizzle.__drizzle_migrations` table, so `db:migrate` only runs new ones.

To change the schema:

1. Edit `lib/db/schema.ts`.
2. `npm run db:generate -- --name short_description` to create the next SQL file in `drizzle/`.
3. Review the generated SQL, especially renames and dropped columns.
4. `npm run db:migrate` against your database, then commit the schema and migration together.
5. Deploy.

Never edit a migration that has already been applied; add a new one instead. `db:push` is still available for quick throwaway experiments, but don't use it on the production database.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run db:generate` | Create a new SQL migration from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:push` | Sync the schema directly, without migrations (local experiments only) |
| `npm run db:seed` | Insert starter content into empty tables |
| `npm run db:studio` | Browse the database with Drizzle Studio |
| `npm run hash-password` | Generate `ADMIN_PASSWORD_HASH` |

## Skill icons

The skill icon field accepts:
- a [Simple Icons](https://simpleicons.org) slug, e.g. `flutter`, `firebase`, `supabase`
- `lucide:<name>` for a built-in line icon (pick from the admin form)
- an image URL
