import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";

import { auth } from "@ziron/auth";

import { AppHeader } from "@/components/layout/header/app-header";

import { isLoggedIn } from "@/features/auth/lib/api";
import { OrganizationsTable } from "@/features/organization/components/table";

export default async function OrganizationsPage() {
	const loggedIn = await isLoggedIn();

	if (!loggedIn) {
		redirect("/login");
	}

	const _organization = await auth.api.listOrganizations({
		headers: await headers(),
	});

	return (
		<>
			<AppHeader title="Organizations">
				<div className="flex items-center gap-2">
					<Button>
						<PlusIcon className="size-3.5" weight="bold" />
						Create Organization
					</Button>
				</div>
			</AppHeader>

			<section className="container mt-4">
				<OrganizationsTable />
			</section>
		</>
	);
}
