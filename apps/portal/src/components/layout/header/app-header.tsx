"use client";

import { useRef } from "react";

import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { StarIcon } from "lucide-react";

import { MousePointerClickIcon, type MousePointerClickIconHandle } from "@ziron/ui/assets/icons/mouse";
import { Button } from "@ziron/ui/components/button";

import { BackButton } from "@/components/primitives/buttons/back-button";

export const AppHeader = () => {
	const ref = useRef<MousePointerClickIconHandle>(null);
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 py-2 backdrop-blur-xl">
			<div className="container flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<BackButton href="/" />
					<h1 className="font-semibold">Cards</h1>
					<CaretRightIcon />
					<span className="font-semibold">New Card</span>

					<Button size="icon" variant="ghost">
						<StarIcon />
					</Button>
				</div>

				<div>
					<Button
						onMouseEnter={() => ref.current?.startAnimation()}
						onMouseLeave={() => ref.current?.stopAnimation()}
						variant="outline"
					>
						<MousePointerClickIcon ref={ref} /> 11 clicks
					</Button>
					<Button variant="secondary">Share card</Button>
				</div>
			</div>
		</header>
	);
};
