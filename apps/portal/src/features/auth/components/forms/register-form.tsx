"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { Separator } from "@ziron/ui/components/separator";
import { toastManager } from "@ziron/ui/components/toast";

import { registerSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";
import { signInWithProvider } from "@/lib/auth/social-login";

import { handleAuthError } from "../../lib/handle-auth-error";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const lastMethod = authClient.getLastUsedLoginMethod();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		validators: {
			onSubmit: registerSchema,
		},
		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.signUp.email({
					email: value.email,
					name: value.name,
					password: value.password,

					callbackURL: "/",
					fetchOptions: {
						onSuccess: () => {
							toastManager.add({
								title: "Registered successfully.",
								description: "You are now signed in.",
								type: "success",

								timeout: 3000,
							});
							router.push("/");
						},
						onError: (ctx) => {
							const { error } = ctx;

							handleAuthError({
								context: "register",
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
			<div className="flex items-center gap-6 text-muted-foreground">
				<Separator className="flex-1" /> or <Separator className="flex-1" />
			</div>
			<form
				className="space-y-4"
				id="register-form"
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
									<FieldLabel htmlFor={field.name}>Name</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										autoComplete="off"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Enter your name"
										value={field.state.value}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
						name="name"
					/>
					<form.Field
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Email</FieldLabel>

									<Input
										aria-invalid={isInvalid}
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
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Enter your password"
										type="password"
										value={field.state.value}
									/>

									<FieldDescription>
										Must contain 1 uppercase letter, 1 number, min. 8 characters.
									</FieldDescription>

									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
						name="password"
					/>
				</FieldGroup>

				<Button className="w-full" disabled={isPending} form="register-form" type="submit">
					{isPending ? "Registering..." : "Register"}
				</Button>
			</form>
		</div>
	);
};
