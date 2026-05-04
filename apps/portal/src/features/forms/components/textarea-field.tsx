import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@ziron/ui/components/input-group";
import { Textarea } from "@ziron/ui/components/textarea";

import { useFieldContext } from "../hooks/form-contexts";

interface TextFieldProps extends ComponentProps<typeof Textarea> {
	label: string;
	showCount?: boolean;
	maxLength?: number;
}

export const TextField = ({ label, placeholder, showCount, maxLength = 120, required, ...rest }: TextFieldProps) => {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>
				{label}
				{required && <span className="text-brand-accent-foreground">*</span>}
			</FieldLabel>
			<InputGroup aria-invalid={isInvalid}>
				<InputGroupTextarea
					{...rest}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					placeholder={placeholder}
					value={field.state.value}
				/>
				{showCount && (
					<InputGroupAddon align="block-end">
						<InputGroupText className="text-muted-foreground text-xs">
							{Math.max(0, maxLength - (field.state.value?.length || 0))} characters left
						</InputGroupText>
					</InputGroupAddon>
				)}
			</InputGroup>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
};
