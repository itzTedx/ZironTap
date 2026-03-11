import { db as database } from "@ziron/db";

import { base } from "../base";

export const dbProvider = base.middleware(async ({ next }) => {
	const db = database;

	return next({
		context: {
			db,
		},
	});
});
