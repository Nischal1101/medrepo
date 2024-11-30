ALTER TABLE "doctors" ALTER COLUMN "doctor_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ALTER COLUMN "hospital_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "patient_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "attachment_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "findings";--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "recommendations";