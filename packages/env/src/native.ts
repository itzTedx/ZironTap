import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
	clientPrefix: "EXPO_PUBLIC_",
	client: {
		// EXPO_PUBLIC_SERVER_URL: z.url(),
	},
	// biome-ignore lint/style/noProcessEnv: process.env is used in native environments
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
