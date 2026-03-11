import type { NextRequest } from "next/server";

import { auth } from "@ziron/auth";

import type { ORPCContext } from "./base";

export async function createContext(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	const context: ORPCContext = {
		request,
	};

	return {
		...context,
		session,
	};
}
