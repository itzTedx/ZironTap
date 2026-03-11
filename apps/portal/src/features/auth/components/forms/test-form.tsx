"use client";

import { useForm } from "@tanstack/react-form";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@ziron/ui/components/input-group";
import { toastManager } from "@ziron/ui/components/toast";

import { formSchema } from "@ziron/validators";

export function BugReportForm() {
	const form = useForm({
		defaultValues: {
			title: "",
			description: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			toastManager.add({
				title: "You submitted the following values:",
				description: JSON.stringify(value, null, 2),
				type: "success",
			});
		},
	});

	return (
		<form
			id="bug-report-form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field
					// biome-ignore lint/correctness/noChildrenProp: needed for form.Field
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="off"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Login button not working on mobile"
									value={field.state.value}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
					name="title"
				/>
				<form.Field
					// biome-ignore lint/correctness/noChildrenProp: needed for form.Field
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Description</FieldLabel>
								<InputGroup>
									<InputGroupTextarea
										aria-invalid={isInvalid}
										className="min-h-24 resize-none"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="I'm having an issue with the login button on mobile."
										rows={6}
										value={field.state.value}
									/>
									<InputGroupAddon align="block-end">
										<InputGroupText className="tabular-nums">
											{field.state.value.length}/100 characters
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
								<FieldDescription>
									Include steps to reproduce, expected behavior, and what actually happened.
								</FieldDescription>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
					name="description"
				/>
			</FieldGroup>
			<Field orientation="horizontal">
				<Button onClick={() => form.reset()} type="button" variant="outline">
					Reset
				</Button>
				<Button form="bug-report-form" type="submit">
					Submit
				</Button>
			</Field>
		</form>
	);
}
