import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import {
	Autocomplete,
	AutocompleteEmpty,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
	AutocompletePopup,
} from "@ziron/ui/components/autocomplete";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";

import { useFieldContext } from "../hooks/form-contexts";

interface AutocompleteFieldProps extends ComponentProps<typeof AutocompleteInput> {
	label: string;
	className?: string;
	items: readonly unknown[] | undefined;
}

export function AutocompleteField({ label, placeholder, items, className, required, ...rest }: AutocompleteFieldProps) {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field className={className} data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>
				{label}
				{required && <span className="font-medium text-brand-accent-foreground">*</span>}
			</FieldLabel>
			<Autocomplete items={items} onValueChange={(value) => field.handleChange(value)} value={field.state.value}>
				<AutocompleteInput
					{...rest}
					aria-invalid={isInvalid}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
					placeholder={placeholder}
				/>
				<AutocompletePopup>
					<AutocompleteEmpty>No items found.</AutocompleteEmpty>
					<AutocompleteList>
						{(item) => (
							<AutocompleteItem key={item.value} value={item}>
								{item.label}
							</AutocompleteItem>
						)}
					</AutocompleteList>
				</AutocompletePopup>
			</Autocomplete>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
