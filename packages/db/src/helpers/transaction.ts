import type { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * Transaction callback. Receives a transactional db instance; return value is
 * passed through from the runner.
 */
export type TransactionCallback<T, S extends Record<string, unknown>> = (tx: NodePgDatabase<S>) => Promise<T>;
