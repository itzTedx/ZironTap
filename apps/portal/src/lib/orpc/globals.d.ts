import type { RouterClient } from "@orpc/server";

import type { router } from "@ziron/api/routers";

declare global {
	// Shared singleton client populated in server runtime
	var $client: RouterClient<typeof router> | undefined;
}
