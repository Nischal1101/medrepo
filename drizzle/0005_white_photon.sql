ALTER TABLE "doctors" ALTER COLUMN "specialization" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "specialization" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "doctors" ADD COLUMN "is_verified" boolean DEFAULT false;