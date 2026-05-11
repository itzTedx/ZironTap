import { headers } from "next/headers";

import { formatRelativeTime } from "@ziron/ui/lib/format-relative-time";

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
			<OrganizationHeader id={data?.id} logo={data?.logo} metadata={data?.metadata} name={data?.name} />

			<div className="grid md:grid-cols-[1fr_360px]">
				<div>Form</div>
				<aside className="divide-y">
					<div className="py-4">
						<span className="text-muted-foreground text-sm">Org Id</span>
						<p className="font-medium">{data?.id}</p>
					</div>
					<div className="py-4">
						<span className="text-muted-foreground text-sm">Org slug</span>
						<p className="font-medium">{data?.slug}</p>
					</div>
					<div className="py-4">
						<span className="text-muted-foreground text-sm">Created at</span>
						<p className="font-medium">
							{data?.createdAt.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
					{data?.updatedAt && (
						<div className="py-4">
							<p className="text-muted-foreground text-sm">
								Created at{" "}
								<span className="text-foreground/75">about {formatRelativeTime(data?.updatedAt)}</span>
							</p>
						</div>
					)}
				</aside>
			</div>
			{/* <JsonViewer className="h-auto" data={data} defaultExpanded={2} rootName="organization" /> */}
		</section>
	);
}
