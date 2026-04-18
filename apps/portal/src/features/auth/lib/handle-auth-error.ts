"use client";

import { toastManager } from "@ziron/ui/components/toast";

type AuthErrorContext = "login" | "register";

type AuthError = {
	status?: number;
	message?: string;
	[key: string]: unknown;
};

type HandleAuthErrorParams = {
	context: AuthErrorContext;
	email?: string;
	error: AuthError;
};

export function handleAuthError({ context, email, error }: HandleAuthErrorParams) {
	const status = error.status;

	console.error(`${context} error`, {
		email,
		status,
		error,
	});

	switch (status) {
		case 400:
			toastManager.add({
				title: "Invalid request. Please check your email and password.",
				type: "error",
			});
			break;
		case 401:
			toastManager.add({
				title: "Invalid email or password. Please try again.",
				type: "error",
			});
			break;
		case 403:
			toastManager.add({
				title: "Access denied.",
				description: "Please verify your email address",
				type: "error",
			});
			break;
		default:
			toastManager.add({
				title: "An unexpected error occurred. Please try again.",
				type: "error",
			});
	}
}
