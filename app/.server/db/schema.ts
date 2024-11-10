import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

// Auth
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["customer", "staff", "admin"] })
    .default("customer")
    .notNull(),
  hashedPassword: text("hashedPassword"),
  emailVerified: integer("emailVerified", { mode: "boolean" }).default(false).notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull(),
});

export const passwordReset = sqliteTable("passwordReset", {
  token: text("token").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull(),
});

export const oauthAccountTable = sqliteTable("oauthAccounts", {
  provider: text("provider").notNull(),
  providerId: text("providerId").notNull(),
  providerUserId: text("providerUserId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const emailVerification = sqliteTable("emailVerification", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
});
