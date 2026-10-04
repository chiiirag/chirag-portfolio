CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(120) NOT NULL,
	"company" varchar(120) NOT NULL,
	"company_url" text DEFAULT '' NOT NULL,
	"logo_url" text DEFAULT '' NOT NULL,
	"employment_type" varchar(40) DEFAULT '' NOT NULL,
	"location" varchar(120) DEFAULT '' NOT NULL,
	"work_mode" varchar(40) DEFAULT '' NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"description" text DEFAULT '' NOT NULL,
	"skills" text[] DEFAULT '{}' NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
