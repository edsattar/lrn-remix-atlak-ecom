import 'dotenv/config';
import { db } from "~/.server/db";
import { user, type UserInsert } from "~/.server/db/schema/auth";
import chalk from "chalk";
import { faker } from "@faker-js/faker";

const generatefakeuser = (role?: UserInsert["role"]): UserInsert => {
	return {
		email: faker.internet.email(),
		username: faker.internet.username(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		role,
	};
};

async function seed() {
  const fakeUsers = Array.from({ length: 10 }, () => generatefakeuser());
	await db.insert(user).values(fakeUsers);
}

seed()
	.then(() => {
		console.log(chalk.green("Database seeded successfully."));
		process.exit();
	})
	.catch((err) => {
		console.error(err);
		console.log("Failed to seed database.");
		process.exit(1);
	});
