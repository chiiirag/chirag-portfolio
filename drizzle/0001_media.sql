CREATE TABLE "media" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"filename" varchar(200) NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"size" integer NOT NULL,
	"width" integer,
	"height" integer,
	"data" "bytea" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at" DESC NULLS LAST);