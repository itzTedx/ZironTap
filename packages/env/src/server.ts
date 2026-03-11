import "dotenv/config";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		REDIS_URL: z.string().min(1),
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),

		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		APPLE_CLIENT_ID: z.string().min(1),
		APPLE_TEAM_ID: z.string().min(1),
		APPLE_KEY_ID: z.string().min(1),
		APPLE_PRIVATE_KEY: z.string().min(1),

		LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
		NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	},
	// biome-ignore lint/style/noProcessEnv: process.env is used in server environments
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
