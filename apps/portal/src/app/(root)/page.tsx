import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@ziron/auth";

import { isLoggedIn } from "@/features/auth/lib/api";

export default async function Page() {
	const loggedIn = await isLoggedIn();

	if (!loggedIn) {
		redirect("/login");
	}

	const organization = await auth.api.listOrganizations({
		headers: await headers(),
	});

	if (organization) {
		await auth.api.setActiveOrganization({
			body: {
				organizationId: organization[0]?.id,
				organizationSlug: organization[0]?.slug,
			},
			headers: await headers(),
		});
		return redirect(`/${organization[0]?.slug}/cards`);
	}

	return <div>Page</div>;
}
