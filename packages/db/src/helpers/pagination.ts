import { asc, desc, type SQL } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export interface LimitOffset {
	limit: number;
	offset: number;
}

export interface CursorPayload<T = unknown> {
	cursor: T | null;
	limit: number;
}

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

/**
 * Parse safe limit/offset from query params. Clamps to defaults and max.
 */
export function parseLimitOffset(params: { limit?: number; offset?: number } | undefined): LimitOffset {
	const limit = Math.min(Math.max(1, params?.limit ?? DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
	const offset = Math.max(0, params?.offset ?? 0);
	return { limit, offset };
}

/**
 * Cursor-based pagination: returns `orderBy` and a stable ordering column for cursor.
 * Use with a unique column (e.g. id or created_at + id) for stable pages.
 */
export function cursorOrder<T extends PgColumn>(
	column: T,
	direction: "asc" | "desc" = "asc"
): { orderBy: SQL; column: T } {
	return {
		orderBy: direction === "asc" ? asc(column) : desc(column),
		column,
	};
}
