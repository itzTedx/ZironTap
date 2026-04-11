import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { id, timestamps } from "./columns";

/** Owning user; same id space as `targetId` in usages is not enforced (polymorphic). */
export const mediaAssets = pgTable(
	"media_assets",
	{
		id: id(),
		url: text("url").notNull(),
		alt: text("alt"),

		width: integer("width"),
		height: integer("height"),

		filename: text("filename").unique(),
		fileSize: integer("file_size"),
		fileType: text("file_type"),
		blurHash: text("blur_hash"),

		storageKey: text("storage_key").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		...timestamps(),
	},
	(table) => [index("media_assets_user_id_idx").on(table.userId), index("media_assets_url_idx").on(table.url)]
);

/**
 * Where a library asset is referenced (card, future blog, etc.).
 * `targetType` + `targetId` are polymorphic; enforce allowed pairs in application code.
 * `usageKey` distinguishes multiple uses on the same target (e.g. cover vs gallery slot).
 */
export const mediaUsages = pgTable(
	"media_usages",
	{
		id: id(),
		mediaAssetId: uuid("media_asset_id")
			.notNull()
			.references(() => mediaAssets.id, { onDelete: "cascade" }),
		targetType: text("target_type").notNull(),
		targetId: uuid("target_id").notNull(),
		usageKey: text("usage_key").notNull().default(""),

		...timestamps(),
	},
	(table) => [
		index("media_usages_media_asset_id_idx").on(table.mediaAssetId),
		index("media_usages_target_idx").on(table.targetType, table.targetId),
		uniqueIndex("media_usages_asset_target_usage_uidx").on(
			table.mediaAssetId,
			table.targetType,
			table.targetId,
			table.usageKey
		),
	]
);

export const mediaAssetsRelations = relations(mediaAssets, ({ many }) => ({
	usages: many(mediaUsages),
}));

export const mediaUsagesRelations = relations(mediaUsages, ({ one }) => ({
	asset: one(mediaAssets, {
		fields: [mediaUsages.mediaAssetId],
		references: [mediaAssets.id],
	}),
}));
