import type React from "react";

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
	footer?: React.ReactNode;
}

export const AuthCard = ({ children, title, description, footer }: Props) => {
	return (
		<CardFrame className="w-full max-w-md">
			<Card>
				<CardHeader className="p-9">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardPanel className="p-9">{children}</CardPanel>
			</Card>
			{footer && (
				<CardFrameFooter className="px-9">
					<div className="flex items-center justify-center gap-1">{footer}</div>
				</CardFrameFooter>
			)}
		</CardFrame>
	);
};
