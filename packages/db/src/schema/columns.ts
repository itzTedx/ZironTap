import { serial, text, timestamp } from "drizzle-orm/pg-core";

/** Serial primary key column: `id` (snake_case in DB). */
export function id() {
	return serial("id").primaryKey();
}

/** Text primary key (e.g. cuid, uuid). Use for tables that use string ids. */
export function textPrimaryKey(name = "id") {
	return text(name).primaryKey();
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
