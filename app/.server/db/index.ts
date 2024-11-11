import { drizzle } from "drizzle-orm/libsql";
import { createClient, Client } from "@libsql/client";
import * as auth from "./schema/auth";
// import { loadEnvConfig } from "@next/env";
// loadEnvConfig(process.cwd());

// Cache the database connection in development.
// This avoids creating a new connection for every HMR update.

// setting the global variable to store the connection
const globalForDb = globalThis as unknown as { client: Client | undefined };
// checking if the connection is already created or not
const client =
  globalForDb.client ??
  createClient({ url: process.env.DB_URL!, authToken: process.env.DB_AUTH });
// if we are not in production then we will store the connection in the global variable
if (process.env.NODE_ENV !== "production")
  globalForDb.client = createClient({
    url: process.env.DB_URL!,
    authToken: process.env.DB_AUTH,
  });

// schema in multiple files, reference: https://orm.drizzle.team/docs/rqb#querying
export const db = drizzle({ client, schema: { ...auth } });
