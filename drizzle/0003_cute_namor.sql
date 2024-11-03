CREATE TYPE "public"."report_type" AS ENUM('lab_test', 'imaging', 'prescription', 'diagnosis', 'surgery', 'other');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_doctor_access" (
	"report_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"can_access" boolean DEFAULT false NOT NULL,
	"granted_at" timestamp DEFAULT now() NOT NULL,
	"granted_by_doctor_id" integer NOT NULL,
	CONSTRAINT "report_doctor_access_report_id_doctor_id_pk" PRIMARY KEY("report_id","doctor_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"created_by_doctor_id" integer NOT NULL,
	"hospital_id" integer NOT NULL,
	"report_type" "report_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"findings" text,
	"recommendations" text,
	"attachment_url" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_doctor_access" ADD CONSTRAINT "report_doctor_access_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_doctor_access" ADD CONSTRAINT "report_doctor_access_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_doctor_access" ADD CONSTRAINT "report_doctor_access_granted_by_doctor_id_doctors_id_fk" FOREIGN KEY ("granted_by_doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_created_by_doctor_id_doctors_id_fk" FOREIGN KEY ("created_by_doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_hospital_id_hospitals_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
