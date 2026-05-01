import { redirect } from "next/navigation";

import { isLoggedIn } from "@/features/auth/lib/api";

export default async function Page() {
	const loggedIn = await isLoggedIn();

	if (!loggedIn) {
		redirect("/login");
	}

	return <div>Page</div>;
}
