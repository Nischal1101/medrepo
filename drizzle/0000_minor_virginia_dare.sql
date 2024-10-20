CREATE TYPE "public"."user_role" AS ENUM('hospital', 'doctor', 'patient');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"specialization" varchar(100),
	"user_id" integer NOT NULL,
	CONSTRAINT "doctors_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hospital_doctors" (
	"hospital_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	CONSTRAINT "hospital_doctors_hospital_id_doctor_id_pk" PRIMARY KEY("hospital_id","doctor_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hospitals" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(255),
	"phone" varchar(20),
	"user_id" integer NOT NULL,
	CONSTRAINT "hospitals_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_of_birth" date,
	"phone" varchar(20),
	"user_id" integer NOT NULL,
	CONSTRAINT "patients_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"password" varchar(20),
	"role" "user_role" DEFAULT 'patient' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hospital_patients" (
	"hospital_id" integer NOT NULL,
	"patient_id" integer NOT NULL,
	"registration_date" timestamp NOT NULL,
	"discharge_date" timestamp,
	"status" varchar(20) NOT NULL,
	CONSTRAINT "hospital_patients_hospital_id_patient_id_pk" PRIMARY KEY("hospital_id","patient_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_primary_doctors" (
	"patient_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	CONSTRAINT "patient_primary_doctors_patient_id_doctor_id_pk" PRIMARY KEY("patient_id","doctor_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_hospital_id_hospitals_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hospital_patients" ADD CONSTRAINT "hospital_patients_hospital_id_hospitals_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hospital_patients" ADD CONSTRAINT "hospital_patients_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_primary_doctors" ADD CONSTRAINT "patient_primary_doctors_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_primary_doctors" ADD CONSTRAINT "patient_primary_doctors_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
