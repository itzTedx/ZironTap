"use client";

import type React from "react";

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";

import { cn } from "@ziron/ui/lib/utils";

export function Fieldset({ className, ...props }: FieldsetPrimitive.Root.Props): React.ReactElement {
	return (
		<FieldsetPrimitive.Root
			className={cn(
				"flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
				className
			)}
			data-slot="fieldset"
			{...props}
		/>
	);
}
export function FieldsetLegend({ className, ...props }: FieldsetPrimitive.Legend.Props): React.ReactElement {
	return (
		<FieldsetPrimitive.Legend
			className={cn("font-semibold text-foreground", className)}
			data-slot="fieldset-legend"
			{...props}
		/>
	);
}

export { FieldsetPrimitive };
