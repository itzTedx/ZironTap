"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { toastManager } from "@ziron/ui/components/toast";

import { registerSchema } from "@ziron/validators";

import { authClient } from "@/lib/auth/client";

import { handleAuthError } from "../../lib/handle-auth-error";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

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
		<form
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
	);
};
