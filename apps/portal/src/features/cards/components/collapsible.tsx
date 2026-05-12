import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";

import { Collapsible as CollapsibleCn, CollapsiblePanel, CollapsibleTrigger } from "@ziron/ui/components/collapsible";
import { cn } from "@ziron/ui/lib/utils";

interface CollapsibleFrameProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export const Collapsible = ({ title, children, className }: CollapsibleFrameProps) => {
	return (
		<CollapsibleCn className="border-b p-2" defaultOpen>
			<CollapsibleTrigger className="flex items-center gap-2 rounded-sm px-2 py-1 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground data-panel-open:[&_svg]:rotate-180">
				{title}

				<CaretDownIcon
					className="size-3 text-muted-foreground transition-[rotate] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
					weight="fill"
				/>
			</CollapsibleTrigger>

			<CollapsiblePanel className={cn("p-2", className)}>{children}</CollapsiblePanel>
		</CollapsibleCn>
	);
};
