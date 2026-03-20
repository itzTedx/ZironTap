import { Button } from "@ziron/ui/components/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ziron/ui/components/input-group";
import { IconSearch } from "@ziron/ui/icons/search";
import { IconUpload } from "@ziron/ui/icons/upload";
import { cn } from "@ziron/ui/lib/utils";

import { BackButton } from "@/components/primitives/buttons/back-button";

interface Props {
	className?: string;
}

export const MediaLibraryHeader = ({ className }: Props) => {
	return (
		<header className={cn("container flex items-center gap-6 py-2", className)}>
			<BackButton href="/" />
			<h2 className="shrink-0 font-semibold">Media Library</h2>
			<InputGroup>
				<InputGroupInput aria-label="Search" placeholder="Search" type="search" />
				<InputGroupAddon>
					<IconSearch aria-hidden="true" />
				</InputGroupAddon>
			</InputGroup>
			<Button>
				<IconUpload aria-hidden="true" />
				Upload media
			</Button>
		</header>
	);
};
