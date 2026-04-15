import type { RouterClient as AppRouterClient } from "@orpc/server";

import { createCard } from "./card";
import { listMedia, uploadMedia } from "./media";

export const router = {
	card: {
		create: createCard,
	},
	media: {
		upload: uploadMedia,
		list: listMedia,
	},
};

export type Router = typeof router;
export type RouterClient = AppRouterClient<typeof router>;
