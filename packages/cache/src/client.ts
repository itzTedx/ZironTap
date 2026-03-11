import { createClient, type RedisClientType } from "@redis/client";

import { env } from "@ziron/env/server";

let client: RedisClientType | undefined;

export function getCacheClient(): RedisClientType {
	if (!client) {
		client = createClient({
			url: env.REDIS_URL,
		});

		client.on("error", (error) => {
			// eslint-disable-next-line no-console
			console.error("Redis client error", error);
		});

		if (!client.isOpen) {
			// Fire-and-forget connect; callers rely on lazy connection.
			void client.connect();
		}
	}

	return client;
}
