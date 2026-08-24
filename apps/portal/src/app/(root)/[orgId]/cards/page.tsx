import type { Route } from "next";
import Link from "next/link";

import { FadersHorizontalIcon, FunnelIcon } from "@phosphor-icons/react/dist/ssr";

import { CardPlusIcon } from "@ziron/ui/assets/icons/digital-card";
import { SearchIcon } from "@ziron/ui/assets/icons/search";
import { Button } from "@ziron/ui/components/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ziron/ui/components/input-group";
import { Kbd, KbdGroup } from "@ziron/ui/components/kbd";

import { AppHeader } from "@/components/layout/header/app-header";

export default async function CardsPage({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params;
	return (
		<>
			<AppHeader
				action={
					<Button size="sm" variant="outline">
						<FunnelIcon weight="fill" />
						Filter
					</Button>
				}
				title="Cards"
			>
				<div className="flex items-center gap-2">
					<InputGroup className="h-8">
						<InputGroupInput placeholder="Search by card name or id" />
						<InputGroupAddon>
							<SearchIcon />
						</InputGroupAddon>
					</InputGroup>

					<Button size="sm" variant="outline">
						<FadersHorizontalIcon weight="fill" />
						Filter
					</Button>
					<Button render={<Link href={`/${orgId}/cards/new` as Route} />} size="lg">
						<span className="flex items-center gap-1">
							<CardPlusIcon className="size-5" />
							Add card
						</span>
						<KbdGroup>
							<Kbd>Ctrl</Kbd>
							<Kbd>O</Kbd>
						</KbdGroup>
					</Button>
				</div>
			</AppHeader>
		</>
	);
}
