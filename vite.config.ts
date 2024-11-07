import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools";

import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  plugins: [
    remixDevTools({
      pluginDir: "./.devtools/plugins",
    }),
    remix({
      ignoredRouteFiles: ["**/*.css"],
      routes: (defineRoutes) => flatRoutes("routes", defineRoutes),
    }),
    tsconfigPaths(),
  ],
});
