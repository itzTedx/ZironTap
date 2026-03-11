import { pgTable, text } from "drizzle-orm/pg-core";

import { id, timestamps } from "./columns";

export const cards = pgTable("cards", {
	id: id(),
	name: text("name").notNull(),
	...timestamps,
});
