import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form";

import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { Textarea } from "@ziron/ui/components/textarea";

import { useFieldContext } from "../hooks/use-app-form";

interface TextFieldProps extends ComponentProps<typeof Textarea> {
	label: string;
}

export const TextField = ({ label, placeholder, ...rest }: TextFieldProps) => {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
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
};
