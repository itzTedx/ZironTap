import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

import { BackButton } from "@/components/primitives/buttons/back-button";

interface AppHeaderProps {
	backLink?: string;
	title: string;
	subRoute?: string;
	children?: React.ReactNode;
	action?: React.ReactNode;
	root?: boolean;
}

export const AppHeader = ({ backLink, title, children, subRoute, action, root }: AppHeaderProps) => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 py-2 backdrop-blur-xl">
			<div className="container flex items-center justify-between gap-4">
				<div className="flex flex-1 items-center gap-3">
					{backLink && <BackButton href={backLink} root={root} />}
					<h1 className="font-semibold">{title}</h1>
					{subRoute && (
						<>
							<CaretRightIcon />
							<span className="font-semibold">{subRoute}</span>
						</>
					)}

					{action}
				</div>

				{children}
			</div>
		</header>
	);
};
