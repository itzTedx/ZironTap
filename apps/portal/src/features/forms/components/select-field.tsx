import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import { Field, FieldLabel } from "@ziron/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@ziron/ui/components/select";

import { useFieldContext } from "../hooks/form-contexts";

interface SelectFieldProps extends ComponentProps<typeof Select> {
	label?: string;
	isInputGroup?: boolean;
	items: {
		label: string;
		value: string;
	}[];
}

export const SelectField = ({
	items,
	defaultValue,
	isInputGroup = false,
	label,
	required,
	...rest
}: SelectFieldProps) => {
	const field = useFieldContext<string>();

	const _errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	function SelectComp() {
		return (
			<Select
				defaultValue={defaultValue}
				items={items}
				name={field.name}
				onValueChange={(e) => field.handleChange(e)}
				value={field.state.value}
				{...rest}
			>
				<SelectTrigger className="w-fit min-w-none" onBlur={field.handleBlur}>
					<SelectValue />
				</SelectTrigger>
				<SelectPopup>
					{items.map(({ label, value }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectPopup>
			</Select>
		);
	}

	if (isInputGroup) {
		return <SelectComp />;
	}

	return (
		<Field data-invalid={isInvalid}>
			{label && (
				<FieldLabel htmlFor={field.name}>
					{label}
					{required && <span className="text-brand-accent-foreground">*</span>}
				</FieldLabel>
			)}

			<SelectComp />
		</Field>
	);
};
