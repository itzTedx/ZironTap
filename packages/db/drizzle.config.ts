import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

import { env } from "@ziron/env/server";

dotenv.config({
	path: "../../apps/web/.env",
});

const url = env.DATABASE_URL;

export default defineConfig({
	out: "./src/migrations",
	schema: "./src/schema.ts",
	dialect: "postgresql",
	dbCredentials: { url },
	casing: "snake_case",
});
