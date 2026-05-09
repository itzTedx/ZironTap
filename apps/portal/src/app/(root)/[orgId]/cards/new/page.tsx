import { StarIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";

import { AnalyticsButton } from "@/components/layout/header/analytics-button";
import { AppHeader } from "@/components/layout/header/app-header";

import { CardForm } from "@/features/cards/card-form";

export default function NewCard() {
	return (
		<>
			<AppHeader
				action={
					<Button size="icon" variant="ghost">
						<StarIcon />
					</Button>
				}
				backLink="/cards"
				title="Cards"
			>
				<div className="flex items-center gap-2">
					<AnalyticsButton />
					<Button variant="secondary">Share card</Button>
				</div>
			</AppHeader>
			<CardForm />
		</>
	);
}
