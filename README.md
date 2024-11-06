# Remix Manual Install

## Setup

```bash
pnpm init; pnpm i \
&& pnpm add @remix-run/node @remix-run/react @remix-run/serve isbot@4 react react-dom \
&& pnpm add -D @remix-run/dev vite remix-flat-routes remix-development-tools
```

### Typescript

```bash
pnpm add -D typescript vite-tsconfig-paths @types/react @types/react-dom
```

tsconfig.json

```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/.server/**/*.ts",
    "**/.server/**/*.tsx",
    "**/.client/**/*.ts",
    "**/.client/**/*.tsx"
  ],
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true,
    "noErrorTruncation": true,
    "paths": { "~/*": ["./app/*"] },
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "types": ["@remix-run/node", "vite/client"]
  }
}
```

vite.config.ts

```typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools";

import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      ignoredRouteFiles: ["**/*.css"],
      routes: (defineRoutes) => flatRoutes("routes", defineRoutes),
    }),
    tsconfigPaths(),
  ],
});
```

### Tailwindcss

```bash
pnpm add -D tailwindcss postcss autoprefixer; pnpx tailwindcss init --ts -p
echo "@tailwind base;@tailwind components;@tailwind utilities;" > app/tailwind.css
```

tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

### Git hooks

initialize git

```bash
git init
echo "node_modules" > .gitignore
```

husky, commitlint

```bash
pnpm add -D @commitlint/config-conventional @commitlint/cli \
&& echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js;
&& pnpm add -D husky; pnpm exec husky init \
&& echo "npx --no-install commitlint --edit \"$1\"" > .husky/commit-msg;
&& echo "pnpx oxlint@latest" > .husky/pre-commit;
&& echo "pnpm latest" > .husky/post-merge
```
