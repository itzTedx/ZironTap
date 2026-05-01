"use client";

import { useSession } from "@/lib/auth/client";

export default function OnboardingPage() {
	const { data: session } = useSession();

	console.log(session);
	return <div>OnboardingPage</div>;
}
