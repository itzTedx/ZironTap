"use client";

import { useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Checkbox } from "@ziron/ui/components/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { Separator } from "@ziron/ui/components/separator";
import { toastManager } from "@ziron/ui/components/toast";

import { loginSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";
import { signInWithProvider } from "@/lib/auth/social-login";

import { useKeepMeLoggedIn } from "../../hooks/use-keep-me-logged-in";
import { handleAuthError } from "../../lib/handle-auth-error";
import { PasskeyButton } from "../passkey-button";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const lastMethod = authClient.getLastUsedLoginMethod();
	const { keepMeLoggedIn, setKeepMeLoggedIn } = useKeepMeLoggedIn();

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
					rememberMe: keepMeLoggedIn,
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

							handleAuthError({
								context: "login",
								email: value.email,
								error,
							});
						},
					},
				});
			});
		},
	});

	return (
		<div className="space-y-6">
			<div className="flex gap-4">
				<Button
					className="w-full flex-1"
					disabled={isPending}
					onClick={() => signInWithProvider("google")}
					variant="outline"
				>
					Google
					{lastMethod === "google" && (
						<Badge className="absolute -top-2 -right-2" size="sm" variant="outline">
							Last used
						</Badge>
					)}
				</Button>
				<Button
					className="w-full flex-1"
					disabled={isPending}
					onClick={() => signInWithProvider("apple")}
					variant="outline"
				>
					Apple
					{lastMethod === "apple" && (
						<Badge className="absolute -top-2 -right-2" size="sm" variant="outline">
							Last used
						</Badge>
					)}
				</Button>
			</div>
			<div className="flex items-center gap-6">
				<Separator className="flex-1" /> or <Separator className="flex-1" />
			</div>
			<form
				className="space-y-4"
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

				<Button className="relative w-full" disabled={isPending} form="login-form" type="submit">
					{isPending ? "Logging in..." : "Login"}
					{lastMethod === "email" && (
						<Badge className="absolute -top-2 -right-2" size="sm" variant="outline">
							Last used
						</Badge>
					)}
				</Button>

				<div className="flex justify-between">
					<Field className="flex w-auto flex-row items-center gap-2">
						<FieldLabel htmlFor="remember-me">Keep me logged in</FieldLabel>
						<Checkbox
							checked={keepMeLoggedIn}
							id="remember-me"
							name="remember-me"
							onCheckedChange={(value) => {
								setKeepMeLoggedIn(Boolean(value));
							}}
						/>
					</Field>
					<Link href="/forgot-password">Forgot password?</Link>
				</div>
				<PasskeyButton className="mx-auto h-auto w-full max-w-full" />
			</form>
		</div>
	);
};
