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
&& echo "npx oxlint@latest" > .husky/pre-commit;
&& echo "pnpm latest" > .husky/post-merge
```

### Icons

[reference](https://sly-cli.fly.dev/) 
add icons easily with sly-cli

interactive

```bash
npx @sly-cli/sly add 
```

non-interactive

```bash
npx @sly-cli/sly add @radix-ui/icons eraser --directory ./icons --overwrite --yes

```

script to create icon sprites
```ts
// scripts/build-icons.ts
import { existsSync, promises as fs } from "fs";
import path from "path";

import { glob } from "glob";
import { parse } from "node-html-parser";

const cwd = process.cwd();

const inputDir = path.join(cwd, "resources", "svg-icons");
const inputDirRelative = path.relative(cwd, inputDir);

const outputDir = path.join(cwd, "app", "components", "icons");
const outputDirRelative = path.relative(cwd, outputDir);

// Find all SVG files in the input directory and sort them alphabetically
const files = glob
  .sync("**/*.svg", { cwd: inputDir })
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`);
  process.exit(0);
}
// The relative paths are just for cleaner logs
console.log(`Generating sprite for ${inputDirRelative}`);

const spritesheetContent = await generateSvgSprite({ files, inputDir });

await writeIfChanged(path.join(outputDir, "sprite.svg"), spritesheetContent);

/**
 * Outputs an SVG string with all the icons as symbols
 */
async function generateSvgSprite({
  files,
  inputDir,
}: {
  files: string[];
  inputDir: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const input = await fs.readFile(path.join(inputDir, file), "utf8");
      const root = parse(input);
      const svg = root.querySelector("svg");
      if (!svg) throw new Error("No SVG element found");
      svg.tagName = "symbol";
      svg.setAttribute("id", file.replace(/\.svg$/, ""));
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xmlns:xlink");
      svg.removeAttribute("version");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      return svg.toString().trim();
    }),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n");
}

/**
 * Each write can trigger dev server reloads
 * so only write if the content has changed
 */
async function writeIfChanged(filepath: string, newContent: string) {
  if (!existsSync(filepath)) {
    return fs.writeFile(filepath, newContent, "utf8");
  }
  const currentContent = await fs.readFile(filepath, "utf8");
  if (currentContent !== newContent) {
    return fs.writeFile(filepath, newContent, "utf8");
  }
}

const typesContent = await generateTypes({
  names: files.map((file) => file.replace(/\.svg$/, "")),
});

await writeIfChanged(path.join(outputDir, "names.ts"), typesContent);

async function generateTypes({ names }: { names: string[] }) {
  return [
    `// This file is generated by npm run build:icons`,
    "",
    `export type IconName =`,
    ...names.map((name) => `\t| "${name}"`),
    "",
  ].join("\n");
}

```

add script to package.json

```json
{
  "scripts": {
    "build:icons": "bun run scripts/build-icons.ts",
  }
}
```
add sly.json
```json
{
	"$schema": "https://sly-cli.fly.dev/registry/config.json",
	"libraries": [
		{
			"name": "remixicon",
			"directory": "./resources/svg-icons/rm/",
			"postinstall": ["pnpm", "build:icons"],
			"transformers": []
		},
		{
			"name": "@radix-ui/icons",
			"directory": "./resources/svg-icons/rd/",
			"postinstall": ["pnpm", "build:icons"],
			"transformers": []
		}
	]
}
```

### DB

create Turso db

create env

```bash
TURSO_DB_URL=...
TURSO_DB_TOKEN=...
```
add drizzle-orm
```bash
npm i drizzle-orm @libsql/client dotenv
npm i -D drizzle-kit tsx 
```

