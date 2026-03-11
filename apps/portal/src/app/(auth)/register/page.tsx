import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/lib/api";
import { RegisterView } from "@/features/auth/views/register-view";

export default async function RegisterPage() {
	const session = await getSession();

	if (session?.session) {
		return redirect("/");
	}
	return <RegisterView />;
}
