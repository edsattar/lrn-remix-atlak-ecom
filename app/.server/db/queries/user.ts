import { db } from "..";
import { user } from "../schema/auth";
import { eq } from "drizzle-orm";

// Query to select all users
export const getAllUsers = async () => {
  return await db.select().from(user);
};

// Query to select a user by ID
export const getUserById = async (id: number) => {
  return await db.select().from(user).where(eq(user.id, id));
};

// Query to insert a new user
export const insertUser = async (values: typeof user.$inferInsert) => {
  const newUser = await db.insert(user).values(values).returning();
  return newUser[0];
};

// Query to update a user by ID
export const updateUserById = async (
  id: number,
  updatedUser: Partial<typeof user.$inferInsert>,
) => {
  return await db.update(user).set(updatedUser).where(eq(user.id, id));
};

// Query to delete a user by ID
export const deleteUserById = async (id: number) => {
  return await db.delete(user).where(eq(user.id, id));
};
