CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(200) NOT NULL,
	"subject" varchar(200) DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"name" varchar(120) NOT NULL,
	"title" varchar(120) NOT NULL,
	"badge" varchar(80) DEFAULT '' NOT NULL,
	"headline" varchar(200) NOT NULL,
	"headline_highlight" varchar(80) DEFAULT '' NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"about" text DEFAULT '' NOT NULL,
	"hero_note" varchar(120) DEFAULT '' NOT NULL,
	"hero_image_url" text DEFAULT '' NOT NULL,
	"avatar_url" text DEFAULT '' NOT NULL,
	"email" varchar(200) DEFAULT '' NOT NULL,
	"phone" varchar(40) DEFAULT '' NOT NULL,
	"location" varchar(120) DEFAULT '' NOT NULL,
	"github_url" text DEFAULT '' NOT NULL,
	"linkedin_url" text DEFAULT '' NOT NULL,
	"resume_url" text DEFAULT '' NOT NULL,
	"cta_title" varchar(160) DEFAULT '' NOT NULL,
	"cta_text" text DEFAULT '' NOT NULL,
	"seo_description" varchar(300) DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(120) NOT NULL,
	"slug" varchar(140) NOT NULL,
	"category" varchar(120) DEFAULT '' NOT NULL,
	"summary" varchar(300) DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"cover_image_url" text DEFAULT '' NOT NULL,
	"logo_url" text DEFAULT '' NOT NULL,
	"tech_stack" text[] DEFAULT '{}' NOT NULL,
	"app_store_url" text DEFAULT '' NOT NULL,
	"play_store_url" text DEFAULT '' NOT NULL,
	"github_url" text DEFAULT '' NOT NULL,
	"live_url" text DEFAULT '' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(120) NOT NULL,
	"description" varchar(240) DEFAULT '' NOT NULL,
	"icon" varchar(40) DEFAULT 'rocket' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"category" varchar(80) DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(40) NOT NULL,
	"label" varchar(80) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"role" varchar(160) DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"avatar_url" text DEFAULT '' NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "messages_email_created_at_idx" ON "messages" USING btree ("email","created_at");--> statement-breakpoint
CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at" DESC NULLS LAST);