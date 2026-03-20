import { cache } from "react";

import { headers } from "next/headers";

import { auth } from "@ziron/auth";

import { base } from "../base";

// const DEBUG = process.env.NODE_ENV === "development" || process.env.DEBUG_AUTH === "true";

export const getSession = cache(async () =>
	auth.api.getSession({
		headers: await headers(),
	})
);

export const requireAuth = base.middleware(async ({ next, errors }) => {
	const session = await getSession();

	if (!session?.session || !session.user) {
		throw errors.UNAUTHORIZED();
	}

	return next({
		context: {
			session,
			user: session.user,
		},
	});
});
