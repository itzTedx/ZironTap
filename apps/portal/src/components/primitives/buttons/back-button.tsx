import type { Route } from "next";
import Link from "next/link";

import { Button } from "@ziron/ui/components/button";
import { IconArrowLeft } from "@ziron/ui/icons/arrow";

interface Props {
	href: Route;
}

export const BackButton = ({ href }: Props) => {
	return (
		<Button render={<Link href={href} />} size="icon-sm" variant="outline">
			<IconArrowLeft aria-hidden="true" />
			<span className="sr-only">Back</span>
		</Button>
	);
};
