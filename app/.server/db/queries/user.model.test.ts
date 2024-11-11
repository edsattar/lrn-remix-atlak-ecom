import { db } from "~/.server/db";
import { user } from "~/.server/db/schema/auth";
import { insertUser } from "~/.server/db/queries/user";
import { afterEach, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";

type User = typeof user.$inferSelect;

const generateFakeUser = (role?: User["role"]): typeof user.$inferInsert => {
  return {
    email: faker.internet.email(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role,
  };
};

describe("creating users", () => {
  afterEach(async () => {
    await db.delete(user);
  });
  it("user is created properly", async () => {
    const user = await insertUser(generateFakeUser());
    expect(user).toBeDefined();
  });

  it("when creating user with existing email, it throws an error", async () => {
    const user = await insertUser(generateFakeUser());
    expect(() =>
      insertUser({ ...user, username: "something_unique" }),
    ).rejects.toThrow();
  });
});
