import { InfoIcon } from "lucide-react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@ziron/ui/components/empty";

import { MediaUploader } from "./media-uploader";

export const EmptyLibrary = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<InfoIcon className="size-5" />
					</EmptyMedia>
					<EmptyTitle>No items yet</EmptyTitle>
					<EmptyDescription>Start by uploading your files.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<MediaUploader />
				</EmptyContent>
			</Empty>
		</div>
	);
};
