import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/api";
import { LoginView } from "@/features/auth/views/login-view";

export default async function LoginPage() {
	const session = await getSession();

	if (session?.session) {
		return redirect("/");
	}
	return <LoginView />;
}
