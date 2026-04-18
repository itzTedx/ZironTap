"use client";

import { useRouter } from "next/navigation";

import { useActiveOrganization } from "@/lib/auth/client";

export default function Page() {
	const { data } = useActiveOrganization();
	const router = useRouter();

	if (data) {
		router.push(`/${data?.slug}/cards`);
	} else {
		router.push("/login");
	}
}
