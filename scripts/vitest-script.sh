#!/bin/sh
docker compose up -d db
pnpm drizzle-kit push --config=./drizzle/drizzle-test.config.ts
vitest
docker compose down db
