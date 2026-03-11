"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { toastManager } from "@ziron/ui/components/toast";

import { loginSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";

import { PasskeyButton } from "../passkey-button";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.signIn.email({
					email: value.email,
					password: value.password,

					callbackURL: "/",
					fetchOptions: {
						onSuccess: () => {
							toastManager.add({
								title: "Logged in successfully.",
								description: "You are now signed in.",
								type: "success",

								timeout: 3000,
							});
							router.push("/");
						},
						onError: (ctx) => {
							const { error } = ctx;
							const status = error.status;
							// const message = error.message;

							// Handle specific status codes
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
									console.error("Login error:", error);
							}
						},
					},
				});
			});
		},
	});

	return (
		<form
			id="login-form"
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
									autoComplete="email webauthn"
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
				<form.Field
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>

								<Input
									aria-invalid={isInvalid}
									autoComplete="current-password webauthn"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Enter your password"
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

			<div className="flex flex-col gap-2">
				<Button className="w-full" disabled={isPending} form="login-form" type="submit">
					{isPending ? "Logging in..." : "Login"}
				</Button>
				<PasskeyButton />
			</div>
		</form>
	);
};
