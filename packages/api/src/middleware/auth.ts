import { ORPCError } from "@orpc/server";

import { auth } from "@ziron/auth";

import type { ORPCContext } from "../base";

type AuthContext = {
	session: typeof auth.$Infer.Session;
	user: (typeof auth.$Infer.Session)["user"];
};

export const authMiddleware = async ({
	context,
	next,
}: {
	context: ORPCContext;
	next: (args: { context: AuthContext }) => Promise<unknown>;
}) => {
	const session = await auth.api.getSession({ headers: context.request.headers });

	if (!session || !session.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return next({
		context: {
			session,
			user: session.user,
		},
	});
};
