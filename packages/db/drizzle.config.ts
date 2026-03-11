import { defineConfig } from "drizzle-kit";

import { env } from "@ziron/env/server";

const url = env.DATABASE_URL;

export default defineConfig({
	out: "./src/migrations",
	schema: "./src/schema",
	dialect: "postgresql",
	dbCredentials: { url },
	casing: "snake_case",
});
