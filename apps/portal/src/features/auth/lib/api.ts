import { cache } from "react";

import { headers } from "next/headers";

import { auth } from "@ziron/auth";

export const getSession = cache(async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session;
});

export const isLoggedIn = cache(async () => {
	const session = await getSession();

	return Boolean(session?.session);
});
