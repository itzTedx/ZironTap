import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/lib/api";
import { LoginView } from "@/features/auth/views/login-view";

type LoginPageProps = {
	searchParams: Promise<{
		reset?: string;
	}>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const session = await getSession();

	if (session?.session) {
		return redirect("/");
	}

	const params = await searchParams;
	const showResetSuccess = params.reset === "success";

	return <LoginView showResetSuccess={showResetSuccess} />;
}
