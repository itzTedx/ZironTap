import { Separator } from "@ziron/ui/components/separator";

import { EmptyLibrary } from "../components/empty-library";
import { MediaLibraryHeader } from "../components/media-library-header";

export const MediaLibraryView = () => {
	return (
		<div className="flex h-full flex-col">
			<MediaLibraryHeader />
			<Separator />
			<EmptyLibrary />
		</div>
	);
};
