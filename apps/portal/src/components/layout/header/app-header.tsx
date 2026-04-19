import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { StarIcon } from "lucide-react";

import { Button } from "@ziron/ui/components/button";

import { BackButton } from "@/components/primitives/buttons/back-button";

export const AppHeader = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b py-2">
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
					<Button variant="outline">11 clicks</Button>
					<Button variant="secondary">Share card</Button>
				</div>
			</div>
		</header>
	);
};
