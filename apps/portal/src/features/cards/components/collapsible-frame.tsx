import { useState } from "react";

import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ziron/ui/components/collapsible";
import { Frame, FrameHeader, FramePanel } from "@ziron/ui/components/frame";
import { Switch } from "@ziron/ui/components/switch";

interface CollapsibleFrameProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	isToggle?: boolean;
	defaultOpen?: boolean;
}

export const CollapsibleFrame = ({
	title,
	children,
	isToggle = false,
	defaultOpen = true,
	className,
}: CollapsibleFrameProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	return (
		<Frame className="w-full">
			<Collapsible onOpenChange={setIsOpen} open={isOpen}>
				<FrameHeader className="px-2 py-2">
					<CollapsibleTrigger className="flex items-center justify-between data-panel-open:[&_div_>_svg]:rotate-180">
						{title}

						{isToggle ? (
							<Switch checked={isOpen} onCheckedChange={setIsOpen} />
						) : (
							<div className="grid size-6 place-content-center rounded-sm bg-muted">
								<CaretDownIcon className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
							</div>
						)}
					</CollapsibleTrigger>
				</FrameHeader>
				<CollapsiblePanel>
					<FramePanel className={className}>{children}</FramePanel>
				</CollapsiblePanel>
			</Collapsible>
		</Frame>
	);
};
