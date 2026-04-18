"use client";

import type { ReactNode } from "react";

import type { Route } from "next";
import Link from "next/link";

import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipProvider } from "@ziron/ui/components/tooltip";

export interface RailNavTooltipPayload {
	name: string;
	description?: string;
	learnMoreHref?: string;
}

export const railNavTooltipHandle = TooltipCreateHandle<RailNavTooltipPayload>();

function RailNavTooltipBody({ name, description, learnMoreHref }: RailNavTooltipPayload) {
	return (
		<div>
			<span>{name}</span>
			{description ? (
				<div className="overflow-hidden">
					<div className="w-44 py-1 text-xs tracking-tight">
						<p className="text-content-muted">{description}</p>
						{learnMoreHref ? (
							<div className="mt-2.5">
								<Link className="font-semibold underline" href={learnMoreHref as Route} target="_blank">
									Learn more
								</Link>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}

/** One shared popup for all rail icons: Base UI animates position/size/content between triggers. */
export function RailNavTooltipPopup() {
	return (
		<Tooltip handle={railNavTooltipHandle}>
			{({ payload }) => (
				<TooltipPopup
					align="center"
					className="pointer-events-auto animate-slide-up-fade items-center overflow-hidden rounded-xl px-3 py-1.5 font-medium text-sm shadow-sm"
					side="right"
					sideOffset={8}
				>
					{payload !== undefined ? <RailNavTooltipBody {...payload} /> : null}
				</TooltipPopup>
			)}
		</Tooltip>
	);
}

export function RailNavTooltipProvider({ children }: { children: ReactNode }) {
	return (
		<TooltipProvider delay={100}>
			{children}
			<RailNavTooltipPopup />
		</TooltipProvider>
	);
}
