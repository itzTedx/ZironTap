import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { env } from "@ziron/env/server";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as { pool: Pool | undefined };

function createPool(): Pool {
	return new Pool({
		connectionString: env.DATABASE_URL,
		max: 10,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 5000,
	});
}

/**
 * Shared pool for the process. In development this survives HMR; in serverless
 * each invocation may get a new process, so the pool is per-instance.
 */
export function getPool(): Pool {
	if (!globalForDb.pool) {
		globalForDb.pool = createPool();
	}
	return globalForDb.pool;
}

/**
 * Drizzle client with schema (relations, etc.). Use this for all queries.
 */
export function getDb() {
	return drizzle(getPool(), { schema });
}

export const db = getDb();
