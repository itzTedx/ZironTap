import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	slug: text("slug").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
