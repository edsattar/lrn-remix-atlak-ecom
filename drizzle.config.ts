import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/.server/db/schema",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_AUTH,
  },
});
