import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  dialect: "postgresql", 
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  schema: "./src/lib/db/schema.ts",
});
