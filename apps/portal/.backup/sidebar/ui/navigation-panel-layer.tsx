"use client";

import type { PropsWithChildren } from "react";

import { motion } from "motion/react";

import { cn } from "@ziron/ui/lib/utils";

export function NavigationPanelLayer({
	visible,
	direction,
	children,
}: PropsWithChildren<{ visible: boolean; direction: "left" | "right" }>) {
	return (
		<motion.div
			animate={
				visible
					? {
							opacity: 1,
							x: 0,
						}
					: {
							opacity: 0,
							x: direction === "left" ? "-100%" : "100%",
						}
			}
			aria-hidden={!visible ? "true" : undefined}
			className={cn(
				"top-0 left-0 flex size-full flex-col",
				visible ? "relative" : "pointer-events-none absolute"
			)}
			inert={!visible}
			initial={false}
			transition={{
				duration: 0.15,
				ease: "easeInOut",
			}}
		>
			{children}
		</motion.div>
	);
}
