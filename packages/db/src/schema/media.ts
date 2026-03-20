import { pgTable, text } from "drizzle-orm/pg-core";

import { id, timestamps } from "./columns";

export const mediaAssets = pgTable("media_assets", {
	id: id(),
	originalSha256: text("name").notNull(),
	...timestamps,
});
