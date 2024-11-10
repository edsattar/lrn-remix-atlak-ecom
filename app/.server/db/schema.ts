import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

// Auth
export const users = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  role: text("role", { enum: ["user", "admin"] })
    .default("user")
    .notNull(),
});

// export const sessions = sqliteTable("sessions", {
//   id: text("id").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expiresAt: integer("expiresAt").notNull(),
// });
//
// export const passwordReset = sqliteTable("passwordReset", {
//   token: text("token").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expiresAt: integer("expiresAt").notNull(),
// });
//
// export const oauthAccountTable = sqliteTable("oauthAccounts", {
//   provider: text("provider").notNull(),
//   providerId: text("providerId").notNull(),
//   providerUserId: text("providerUserId").notNull(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
// });
//
// export const emailVerification = sqliteTable("emailVerification", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   email: text("email").notNull(),
//   code: text("code").notNull(),
//   expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
// });
