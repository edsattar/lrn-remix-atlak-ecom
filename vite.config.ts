import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
	plugins: [
		remix({
			ignoredRouteFiles: ["**/*"], // to prevent default remix convention from picking up routes
			routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
		}),
		tsconfigPaths(),
	],
	server: { port: 3000 },
});
