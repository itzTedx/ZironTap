import { getCacheClient } from "./client";

export async function getJson<T>(key: string): Promise<T | null> {
	const client = getCacheClient();

	const value = await client.get(key);
	if (value == null) {
		return null;
	}

	try {
		return JSON.parse(value) as T;
	} catch {
		return null;
	}
}

export async function setJson<T>(key: string, value: T, options?: { ttlSeconds?: number }): Promise<void> {
	const client = getCacheClient();
	const payload = JSON.stringify(value);

	if (options?.ttlSeconds && options.ttlSeconds > 0) {
		await client.set(key, payload, {
			EX: options.ttlSeconds,
		});
		return;
	}

	await client.set(key, payload);
}

export async function del(key: string): Promise<void> {
	const client = getCacheClient();
	await client.del(key);
}
