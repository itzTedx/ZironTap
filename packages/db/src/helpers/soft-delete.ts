import { isNotNull, isNull } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

/**
 * Condition: row is not soft-deleted (deleted_at IS NULL).
 * Use in .where() for tables that have a deleted_at column.
 */
export function isNotDeleted(deletedAtColumn: PgColumn) {
	return isNull(deletedAtColumn);
}

/**
 * Condition: row is soft-deleted (deleted_at IS NOT NULL).
 */
export function isDeleted(deletedAtColumn: PgColumn) {
	return isNotNull(deletedAtColumn);
}
