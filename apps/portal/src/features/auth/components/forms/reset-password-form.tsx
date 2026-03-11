"use client";

import { useForm } from "@tanstack/react-form";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { toastManager } from "@ziron/ui/components/toast";

import { resetPasswordSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";

type ResetPasswordFormProps = {
	token: string | null;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: resetPasswordSchema,
		},
		onSubmit: async ({ value }) => {
			if (!token) {
				toastManager.add({
					title: "Invalid reset link.",
					description: "Your reset link is invalid or has expired. Please request a new one.",
					type: "error",
				});
				return;
			}

			try {
				const { error } = await authClient.resetPassword({
					newPassword: value.password,
					token,
				});

				if (error) {
					toastManager.add({
						title: "Unable to reset password.",
						description: error.message ?? "Please try again in a few minutes.",
						type: "error",
					});
					return;
				}

				toastManager.add({
					title: "Password updated.",
					description:
						"Your password has been reset successfully. You can now sign in with your new password.",
					type: "success",
				});
			} catch {
				toastManager.add({
					title: "Something went wrong.",
					description: "Please try again in a few minutes.",
					type: "error",
				});
			}
		},
	});

	return (
		<form
			className="space-y-4"
			id="reset-password-form"
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
								<FieldLabel htmlFor={field.name}>New password</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="new-password"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Enter a new password"
									type="password"
									value={field.state.value}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
					name="password"
				/>
			</FieldGroup>

			<FieldGroup>
				<form.Field
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="new-password"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Re-enter your new password"
									type="password"
									value={field.state.value}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
					name="confirmPassword"
				/>
			</FieldGroup>

			<div className="space-y-2">
				<Button
					className="relative w-full"
					disabled={form.state.isSubmitting}
					form="reset-password-form"
					type="submit"
				>
					Reset password
				</Button>
			</div>
		</form>
	);
}
