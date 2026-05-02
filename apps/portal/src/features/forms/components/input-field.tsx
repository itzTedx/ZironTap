import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";

import { useFieldContext } from "../hooks/use-app-form";

interface InputFieldProps extends ComponentProps<typeof Input> {
	label: string;
	className?: string;
}

export function InputField({ label, placeholder, className, required, ...rest }: InputFieldProps) {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field className={className} data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>
				{label}
				{required && <span className="font-medium text-brand-accent-foreground">*</span>}
			</FieldLabel>
			<Input
				{...rest}
				aria-invalid={isInvalid}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder={placeholder}
				value={field.state.value}
			/>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
