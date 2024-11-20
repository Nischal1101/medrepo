import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "hospital",
  "doctor",
  "patient",
]);
export const reportTypeEnum = pgEnum("report_type", [
  "lab_test",
  "imaging",
  "prescription",
  "diagnosis",
  "surgery",
  "other",
]);

export const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  provider: varchar("provider", { length: 255 }).notNull(),
  password: text("password"),
  role: userRoleEnum("role").notNull().default("patient"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const HospitalTable = pgTable("hospitals", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id),
});

export const DoctorTable = pgTable("doctors", {
  id: serial("id").primaryKey(),
  specialization: varchar("specialization", { length: 100 }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id),
});

export const PatientTable = pgTable("patients", {
  id: serial("id").primaryKey(),
  dob: date("date_of_birth"),
  phone: varchar("phone", { length: 20 }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id),
});
export const ReportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .notNull()
    .references(() => PatientTable.id),
  createdByDoctorId: integer("created_by_doctor_id")
    .notNull()
    .references(() => DoctorTable.id),
  hospitalId: integer("hospital_id")
    .notNull()
    .references(() => HospitalTable.id),
  reportType: reportTypeEnum("report_type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  findings: text("findings"),
  recommendations: text("recommendations"),
  attachmentUrl: varchar("attachment_url", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const HospitalDoctorsTable = pgTable(
  "hospital_doctors",
  {
    hospitalId: integer("hospital_id")
      .references(() => HospitalTable.id)
      .notNull(),
    doctorId: integer("doctor_id")
      .references(() => DoctorTable.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.hospitalId, table.doctorId] }),
  })
);

export const patientPrimaryDoctors = pgTable(
  "patient_primary_doctors",
  {
    patientId: integer("patient_id")
      .references(() => PatientTable.id)
      .notNull(),
    doctorId: integer("doctor_id")
      .references(() => DoctorTable.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.patientId, table.doctorId] }),
  })
);

export const hospitalPatients = pgTable(
  "hospital_patients",
  {
    hospitalId: integer("hospital_id")
      .references(() => HospitalTable.id)
      .notNull(),

    patientId: integer("patient_id")
      .references(() => PatientTable.id)
      .notNull(),
    registrationDate: timestamp("registration_date").notNull(),
    dischargeDate: timestamp("discharge_date"),
    status: varchar("status", { length: 20 }).notNull(), // e.g., 'registered', 'admitted', 'discharged'
  },
  (table) => ({
    pk: primaryKey({ columns: [table.hospitalId, table.patientId] }),
  })
);



// Simple table for doctor access to reports
export const ReportDoctorAccess = pgTable(
  "report_doctor_access",
  {
    reportId: integer("report_id")
      .notNull()
      .references(() => ReportsTable.id, { onDelete: "cascade" }),
    doctorId: integer("doctor_id")
      .notNull()
      .references(() => DoctorTable.id),
    canAccess: boolean("can_access").default(false).notNull(),
    grantedAt: timestamp("granted_at").defaultNow().notNull(),
    grantedByDoctorId: integer("granted_by_doctor_id")
      .notNull()
      .references(() => DoctorTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.reportId, table.doctorId] }),
  })
);
