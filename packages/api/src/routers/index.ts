import type { RouterClient as AppRouterClient } from "@orpc/server";

import { createCard } from "./card";

export const router = {
	card: {
		create: createCard,
	},
};

export type Router = typeof router;
export type RouterClient = AppRouterClient<typeof router>;
