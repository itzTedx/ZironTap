import { redirect } from "next/navigation";

import { PlusIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";

import { AppHeader } from "@/components/layout/header/app-header";

import { isLoggedIn } from "@/features/auth/lib/api";
import { OrganizationView } from "@/features/organization/views/organization-view";

export default async function OrganizationPage({ params }: { params: Promise<{ orgId: string }> }) {
	const { orgId } = await params;
	const loggedIn = await isLoggedIn();

	if (!loggedIn) {
		redirect("/login");
	}

	return (
		<>
			<AppHeader
				action={
					<Button size="icon-sm" variant="ghost">
						<StarIcon />
					</Button>
				}
				backLink="/organizations"
				root
				title="Organizations"
			>
				<div className="flex items-center gap-2">
					<Button>
						<PlusIcon className="size-3.5" weight="bold" />
						Actions
					</Button>
				</div>
			</AppHeader>
			<OrganizationView orgId={orgId} />
		</>
	);
}
