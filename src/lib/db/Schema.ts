import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  primaryKey,
  timestamp,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "hospital",
  "doctor",
  "patient",
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
  dateOfBirth: date("date_of_birth"),
  phone: varchar("phone", { length: 20 }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id),
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
