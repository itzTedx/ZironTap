"use client";

import {
	Children,
	type ComponentProps,
	isValidElement,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
	useState,
} from "react";

import { TooltipContent, TooltipProvider, Tooltip as TooltipRoot, TooltipTrigger } from "@ziron/ui/components/tooltip";
import { cn } from "@ziron/ui/lib/utils";

export interface TooltipProps extends Omit<ComponentProps<typeof TooltipContent>, "children" | "content"> {
	content: ReactNode;
	disabled?: boolean;
	delay?: ComponentProps<typeof TooltipProvider>["delay"];
	disableHoverablePopup?: ComponentProps<typeof TooltipRoot>["disableHoverablePopup"];
}

export const Tooltip = ({
	content,
	disabled,
	children,
	delay,
	side,
	disableHoverablePopup,
	className,
	...restPopup
}: PropsWithChildren<TooltipProps>) => {
	const [open, setOpen] = useState(false);
	if (!isValidElement(children)) {
		throw new Error("Tooltip requires a single React element child");
	}

	const triggerElement = Children.only(children) as ReactElement;

	return (
		<TooltipProvider delay={delay}>
			<TooltipRoot
				disabled={disabled}
				disableHoverablePopup={disableHoverablePopup}
				onOpenChange={setOpen}
				open={disabled ? false : open}
			>
				<TooltipTrigger render={triggerElement} />
				<TooltipContent
					className={cn(
						"pointer-events-auto animate-slide-up-fade items-center overflow-hidden rounded-xl shadow-sm",
						className
					)}
					side={side}
					sideOffset={8}
					{...restPopup}
				>
					{content}
				</TooltipContent>
			</TooltipRoot>
		</TooltipProvider>
	);
};
