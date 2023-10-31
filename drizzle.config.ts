import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/schema.ts",
  out: "./lib/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgres://default:1VewHl0pmaGL@ep-rapid-flower-10438219-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
  }
} satisfies Config;
