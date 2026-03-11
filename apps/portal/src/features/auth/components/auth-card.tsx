import type React from "react";

import { CircleAlertIcon } from "lucide-react";

import {
	Card,
	CardDescription,
	CardFrame,
	CardFrameFooter,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@ziron/ui/components/card";

interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
}

export const AuthCard = ({ children, title, description }: Props) => {
	return (
		<CardFrame className="w-full max-w-md">
			<Card>
				<CardHeader className="p-9">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardPanel className="p-9">{children}</CardPanel>
			</Card>
			<CardFrameFooter className="px-9">
				<div className="flex gap-1 text-muted-foreground text-xs">
					<CircleAlertIcon className="size-3 h-lh shrink-0" />
					<p>This will take a few seconds to complete.</p>
				</div>
			</CardFrameFooter>
		</CardFrame>
	);
};
