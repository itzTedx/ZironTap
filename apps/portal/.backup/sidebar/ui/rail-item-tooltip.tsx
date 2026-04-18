"use client";

import type { PropsWithChildren, ReactElement } from "react";

import { TooltipTrigger } from "@ziron/ui/components/tooltip";

import { railNavTooltipHandle } from "./rail-nav-tooltip-group";

export function RailItemTooltip({
	name,
	description,
	learnMoreHref,
	disabled,
	render,
	children,
}: PropsWithChildren<{
	name: string;
	description?: string;
	learnMoreHref?: string;
	disabled?: boolean;
	render: ReactElement;
}>) {
	return (
		<TooltipTrigger
			delay={100}
			disabled={disabled}
			handle={railNavTooltipHandle}
			payload={{ description, learnMoreHref, name }}
			render={render}
		>
			{children}
		</TooltipTrigger>
	);
}
