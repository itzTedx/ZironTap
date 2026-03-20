import z from "zod";

import { cards } from "@ziron/db/schema";

import { publicProcedure } from "..";
import { dbProvider } from "../middleware";

export const createCard = publicProcedure
	.use(dbProvider)
	.output(
		z.object({
			cardName: z.string(),
		})
	)
	.route({
		method: "POST",
		path: "/card",
		summary: "Create a new card",
		description: "Create a new card with the given name, phone, website, address, and logo",
		tags: ["card"],
	})
	.handler(async ({ context, errors }) => {
		const [card] = await context.db
			.insert(cards)
			.values({
				name: "test",
			})
			.returning();

		if (!card) {
			throw errors.NOT_FOUND();
		}
		return { cardName: card.name };
	});
