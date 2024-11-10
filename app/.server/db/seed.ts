import { db } from ".";
import { users } from "./schema";
import chalk from "chalk";

// Seed the database with some data.

async function seed() {
	await db.insert(users).values([
		{
			email: "jake@test.com",
			username: "jakepaul",
			firstName: "Jake",
			lastName: "Paul",
			role: "user",
		},
	]);
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
