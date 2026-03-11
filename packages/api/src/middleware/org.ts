import { ORPCError } from "@orpc/server";

import { auth } from "@ziron/auth";

import type { ORPCContext } from "../base";

type OrgContext = {
	org: unknown;
	orgMembership: unknown | null;
};

const ORG_HEADER = "x-org-slug";

export const orgMiddleware = async ({
	context,
	next,
}: {
	context: ORPCContext;
	next: (args: { context: OrgContext }) => Promise<unknown>;
}) => {
	const session = await auth.api.getSession({ headers: context.request.headers });

	if (!session || !session.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	const slug = context.request.headers.get(ORG_HEADER);

	if (!slug) {
		throw new ORPCError("BAD_REQUEST");
	}

	// Use Better Auth organization plugin data from the session.
	const organizations = (session as unknown as { organizations?: Array<{ slug?: string }> }).organizations ?? [];
	const organization = organizations.find((org) => org.slug === slug) ?? null;

	if (!organization) {
		throw new ORPCError("FORBIDDEN");
	}

	return next({
		context: {
			org: organization,
			orgMembership: null,
		},
	});
};
