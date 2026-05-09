import { FadersHorizontalIcon, FunnelIcon } from "@phosphor-icons/react/dist/ssr";

import { SearchIcon } from "@ziron/ui/assets/icons/search";
import { Button } from "@ziron/ui/components/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ziron/ui/components/input-group";

import { AppHeader } from "@/components/layout/header/app-header";

export default function CardsPage() {
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
				</div>
			</AppHeader>
		</>
	);
}
