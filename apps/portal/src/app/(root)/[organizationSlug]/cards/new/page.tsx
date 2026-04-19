import { AppHeader } from "@/components/layout/header/app-header";

import { CardForm } from "@/features/cards/card-form";

export default function NewCard() {
	return (
		<div>
			<AppHeader />
			<CardForm />
		</div>
	);
}
