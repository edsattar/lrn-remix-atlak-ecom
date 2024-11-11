import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/.server/db/schema",
  dialect: "turso",
  dbCredentials: {
    url: "http://127.0.0.1:8080",
  },
});
