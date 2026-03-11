import { text, timestamp, uuid } from "drizzle-orm/pg-core";

/** Text primary key (e.g. cuid, uuid). Use for tables that use string ids. */
export function textPrimaryKey(name = "id") {
	return text(name).primaryKey();
}

/** UUID primary key column with `default gen_random_uuid()`. */
export function id(name = "id") {
	return uuid(name).primaryKey().defaultRandom();
}

/** `created_at` — not null, default now(). */
export function createdAt() {
	return timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
}

/** `updated_at` — not null, default now(). */
export function updatedAt() {
	return timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date());
}

/** `deleted_at` — nullable, for soft deletes. */
export function deletedAt() {
	return timestamp("deleted_at", { withTimezone: true });
}

/** Spread into a table: `createdAt`, `updatedAt`. */
export function timestamps() {
	return {
		createdAt: createdAt(),
		updatedAt: updatedAt(),
	};
}

/** Spread into a table: `createdAt`, `updatedAt`, `deletedAt`. Use for soft-deletable tables. */
export function timestampsWithDeleted() {
	return {
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		deletedAt: deletedAt(),
	};
}

/** Spread into a table: `deletedAt` only (when table already has created/updated). */
export function softDeleteColumn() {
	return { deletedAt: deletedAt() };
}
