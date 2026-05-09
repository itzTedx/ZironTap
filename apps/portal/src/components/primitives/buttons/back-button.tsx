"use client";

import type { Route } from "next";
import Link from "next/link";

import { Button } from "@ziron/ui/components/button";
import { IconArrowLeft } from "@ziron/ui/icons/arrow";

import { authClient } from "@/lib/auth/client";

interface Props {
	href: string;
}

export const BackButton = ({ href }: Props) => {
	const { data: activeOrganization } = authClient.useActiveOrganization();
	return (
		<Button
			render={<Link href={`/${activeOrganization?.slug}/${href}` as Route} />}
			size="icon-sm"
			variant="outline"
		>
			<IconArrowLeft aria-hidden="true" />
			<span className="sr-only">Back</span>
		</Button>
	);
};
