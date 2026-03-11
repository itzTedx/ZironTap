"use client";

import { authClient } from "@/lib/auth/client";

export const useIsLoggedIn = () => {
	const { data, isPending } = authClient.useSession();

	const isLoggedIn = Boolean((data as { session?: unknown } | null)?.session);

	return {
		isLoggedIn,
		isLoading: isPending,
		data,
	};
};
