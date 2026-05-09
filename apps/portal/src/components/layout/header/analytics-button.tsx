"use client";

import { useRef } from "react";

import { MousePointerClickIcon, type MousePointerClickIconHandle } from "@ziron/ui/assets/icons/mouse";
import { Button } from "@ziron/ui/components/button";
export const AnalyticsButton = () => {
	const ref = useRef<MousePointerClickIconHandle>(null);
	return (
		<Button
			onMouseEnter={() => ref.current?.startAnimation()}
			onMouseLeave={() => ref.current?.stopAnimation()}
			variant="outline"
		>
			<MousePointerClickIcon ref={ref} /> 11 clicks
		</Button>
	);
};
