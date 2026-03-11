import "dotenv/config";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		// BETTER_AUTH_SECRET: z.string().min(32),
		// BETTER_AUTH_URL: z.url(),

		NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	},
	// biome-ignore lint/style/noProcessEnv: process.env is used in server environments
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
