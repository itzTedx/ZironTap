ALTER TABLE "post" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_slug_unique" UNIQUE("slug");