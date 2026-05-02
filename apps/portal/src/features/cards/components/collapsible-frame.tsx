import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ziron/ui/components/collapsible";
import { Frame, FrameHeader, FramePanel } from "@ziron/ui/components/frame";

interface CollapsibleFrameProps {
	title: string;
	children: React.ReactNode;
}

export const CollapsibleFrame = ({ title, children }: CollapsibleFrameProps) => {
	return (
		<Frame className="w-full">
			<Collapsible defaultOpen>
				<FrameHeader className="px-2 py-2">
					<CollapsibleTrigger className="flex items-center justify-between data-panel-open:[&_div_>_svg]:rotate-180">
						{title}
						<div className="grid size-6 place-content-center rounded-sm bg-muted">
							<CaretDownIcon className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
						</div>
					</CollapsibleTrigger>
				</FrameHeader>
				<CollapsiblePanel>
					<FramePanel>{children}</FramePanel>
				</CollapsiblePanel>
			</Collapsible>
		</Frame>
	);
};
