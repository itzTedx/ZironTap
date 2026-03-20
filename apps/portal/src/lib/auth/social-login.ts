import { toastManager } from "@ziron/ui/components/toast";

import { authClient } from "./client";

type SocialProvider = "google" | "apple";

export async function signInWithProvider(provider: SocialProvider, callbackURL = "/login") {
	try {
		await authClient.signIn.social({
			provider,
			callbackURL,
			fetchOptions: {
				onError: ({ error }) => {
					// Non-sensitive client-side logging for observability.
					console.error("Social sign-in error", {
						provider,
						message: error.message,
						code: error.code,
						status: error.status,
					});

					toastManager.add({
						title: `${provider[0]?.toUpperCase() ?? ""}${provider.slice(1)} sign-in failed`,
						description: error.message ?? "Please try again.",
						type: "error",
					});
				},
			},
		});
	} catch {
		console.error("Social sign-in unexpected failure", { provider });

		toastManager.add({
			title: "Sign-in error",
			description: "Something went wrong. Please try again.",
			type: "error",
		});
	}
}
