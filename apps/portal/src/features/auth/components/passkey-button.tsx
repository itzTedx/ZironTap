"use client";

import { useEffect, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@ziron/ui/components/button";
import { toastManager } from "@ziron/ui/components/toast";

import { authClient } from "@/lib/auth/client";

async function isWebAuthnAutofillSupported() {
	if (
		typeof window === "undefined" ||
		typeof PublicKeyCredential === "undefined" ||
		typeof PublicKeyCredential.isConditionalMediationAvailable !== "function"
	) {
		return false;
	}

	try {
		return await PublicKeyCredential.isConditionalMediationAvailable();
	} catch {
		return false;
	}
}

export const PasskeyButton = ({ className }: { className?: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const lastMethod = authClient.getLastUsedLoginMethod();

	useEffect(() => {
		let cancelled = false;

		void (async () => {
			const supported = await isWebAuthnAutofillSupported();

			if (!supported || cancelled) {
				return;
			}

			try {
				await authClient.signIn.passkey({ autoFill: true });
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error("Passkey autofill sign-in failed:", error);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	const handlePasskeySignIn = () => {
		startTransition(async () => {
			const autoFillSupported = await isWebAuthnAutofillSupported();

			await authClient.signIn.passkey({
				autoFill: autoFillSupported,
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
		<Button className={className} disabled={isPending} onClick={handlePasskeySignIn} type="button" variant="link">
			{isPending
				? "Waiting for passkey..."
				: lastMethod === "passkey"
					? "Sign in with your passkey (last used)"
					: "Use passkey instead"}
		</Button>
	);
};
