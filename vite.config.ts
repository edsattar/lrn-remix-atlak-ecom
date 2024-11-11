/// <reference types="vitest/config" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { flatRoutes } from "remix-flat-routes";
import { configDefaults } from "vitest/config";

export default defineConfig({
	plugins: [
		remix({
			ignoredRouteFiles: ["**/*"], // to prevent default remix convention from picking up routes
			routes: async (defineRoutes) => {
				return flatRoutes("routes", defineRoutes);
			},
		}),
		tsconfigPaths(),
	],
	server: { port: 3000 },
	test: {
		...configDefaults,
		// environment: "happy-dom",
		include: ["./app/**/*.test.{ts, tsx}"],
	},
});
