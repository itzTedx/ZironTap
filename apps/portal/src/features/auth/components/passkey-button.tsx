"use client";

import { useEffect, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@ziron/ui/components/button";
import { toastManager } from "@ziron/ui/components/toast";

import { authClient } from "@/lib/auth/client";

export const PasskeyButton = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	useEffect(() => {
		if (
			!PublicKeyCredential.isConditionalMediationAvailable ||
			!PublicKeyCredential.isConditionalMediationAvailable()
		) {
			return;
		}

		void authClient.signIn.passkey({ autoFill: true });
	}, []);

	const handlePasskeySignIn = () => {
		startTransition(async () => {
			await authClient.signIn.passkey({
				autoFill: true,
				fetchOptions: {
					onSuccess: () => {
						toastManager.add({
							title: "Signed in with passkey.",
							description: "You are now signed in.",
							type: "success",
							timeout: 3000,
						});
						router.push("/");
					},
					onError: ({ error }) => {
						toastManager.add({
							title: "Passkey sign-in failed.",
							description: "Please try again or use email and password.",
							type: "error",
						});
						// eslint-disable-next-line no-console
						console.error("Passkey sign-in error:", error);
					},
				},
			});
		});
	};

	return (
		<Button disabled={isPending} onClick={handlePasskeySignIn} type="button" variant="link">
			{isPending ? "Waiting for passkey..." : "Use passkey instead"}
		</Button>
	);
};
