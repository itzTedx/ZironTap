"use client";

import { useEffect, useState } from "react";

import { useForm } from "@tanstack/react-form";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { toastManager } from "@ziron/ui/components/toast";

import { forgotPasswordSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";

const RESEND_COOLDOWN_SECONDS = 60;

export function ForgotPasswordForm() {
	const [hasRequested, setHasRequested] = useState(false);
	const [resendIn, setResendIn] = useState<number | null>(null);

	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: forgotPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const origin = typeof window !== "undefined" ? window.location.origin : "";

				const redirectTo = origin ? `${origin}/reset-password` : undefined;

				const { error } = await authClient.requestPasswordReset({
					email: value.email,
					redirectTo,
				});

				if (error) {
					toastManager.add({
						title: "Unable to send reset email.",
						description: error.message ?? "Please try again in a few minutes.",
						type: "error",
					});
					return;
				}

				toastManager.add({
					title: "Reset password email sent.",
					description: "If an account exists for that email, you will receive a link to reset your password.",
					type: "success",
				});

				setHasRequested(true);
				setResendIn(RESEND_COOLDOWN_SECONDS);
			} catch {
				toastManager.add({
					title: "Something went wrong.",
					description: "Please try again in a few minutes.",
					type: "error",
				});
			}
		},
	});

	useEffect(() => {
		if (resendIn === null || resendIn <= 0) {
			return;
		}

		const id = window.setInterval(() => {
			setResendIn((prev) => {
				if (prev === null || prev <= 1) {
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			window.clearInterval(id);
		};
	}, [resendIn]);

	const handleResend = async () => {
		if (!hasRequested) {
			return;
		}

		if (resendIn !== null && resendIn > 0) {
			return;
		}

		const email = form.state.values.email;

		if (!email) {
			toastManager.add({
				title: "Email required.",
				description: "Enter your email before requesting another reset link.",
				type: "error",
			});
			return;
		}

		try {
			const origin = typeof window !== "undefined" ? window.location.origin : "";
			const redirectTo = origin ? `${origin}/reset-password` : undefined;

			const { error } = await authClient.requestPasswordReset({
				email,
				redirectTo,
			});

			if (error) {
				toastManager.add({
					title: "Unable to resend reset email.",
					description: error.message ?? "Please try again in a few minutes.",
					type: "error",
				});
				return;
			}

			toastManager.add({
				title: "Reset password email resent.",
				description: "If an account exists for that email, you will receive a link to reset your password.",
				type: "success",
			});

			setResendIn(RESEND_COOLDOWN_SECONDS);
		} catch {
			toastManager.add({
				title: "Something went wrong.",
				description: "Please try again in a few minutes.",
				type: "error",
			});
		}
	};

	return (
		<form
			className="space-y-4"
			id="forgot-password-form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="off"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Enter your email"
									value={field.state.value}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
					name="email"
				/>
			</FieldGroup>

			<div className="space-y-2">
				<Button
					className="relative w-full"
					disabled={form.state.isSubmitting}
					form="forgot-password-form"
					type="submit"
				>
					Reset Password
				</Button>

				{hasRequested ? (
					<div className="fade-in-0 slide-in-from-bottom-1 flex animate-in items-center justify-center text-muted-foreground text-xs">
						<span className="mr-1">Didn&apos;t receive the email?</span>
						<Button
							className="h-auto px-0 text-xs"
							disabled={form.state.isSubmitting || (resendIn !== null && resendIn > 0)}
							onClick={handleResend}
							size="sm"
							type="button"
							variant="link"
						>
							{resendIn !== null && resendIn > 0 ? `Resend in ${resendIn}s` : "Resend email"}
						</Button>
					</div>
				) : null}
			</div>
		</form>
	);
}
