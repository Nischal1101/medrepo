import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  primaryKey,
  time,
  timestamp,
} from "drizzle-orm/pg-core";

export const HospitalTable = pgTable("hospitals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
});

export const DoctorTable = pgTable("doctors", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  specialization: varchar("specialization", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
});

export const PatientTable = pgTable("patients", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  dateOfBirth: date("date_of_birth"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
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

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  hospitalId: integer("hospital_id")
    .references(() => HospitalTable.id)
    .notNull(),
  doctorId: integer("doctor_id")
    .references(() => DoctorTable.id)
    .notNull(),
  patientId: integer("patient_id")
    .references(() => PatientTable.id)
    .notNull(),
  appointmentDate: date("appointment_date").notNull(),
  appointmentTime: time("appointment_time").notNull(),
});
