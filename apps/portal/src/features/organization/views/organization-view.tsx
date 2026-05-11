import { headers } from "next/headers";

import { auth } from "@ziron/auth";

import { OrganizationHeader } from "../components/organization-header";

interface OrganizationViewProps {
	orgId: string;
}

export async function OrganizationView({ orgId }: OrganizationViewProps) {
	const data = await auth.api.getFullOrganization({
		query: {
			organizationSlug: orgId,
			membersLimit: 100,
		},
		headers: await headers(),
	});

	return (
		<section className="container mt-4">
			<OrganizationHeader id={data?.id} logo={data?.logo} name={data?.name} />

			{/* <JsonViewer className="h-auto" data={data} defaultExpanded={2} rootName="organization" /> */}
		</section>
	);
}
