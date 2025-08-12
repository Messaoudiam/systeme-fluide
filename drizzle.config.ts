import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "aws-0-eu-west-3.pooler.supabase.com",
    port: 6543,
    user: `postgres.${process.env.SUPABASE_PROJECT_REF}`,
    password: process.env.SUPABASE_DB_PASSWORD!,
    database: "postgres",
    ssl: { rejectUnauthorized: false }
  },
  verbose: true,
  strict: true,
  breakpoints: true,
});