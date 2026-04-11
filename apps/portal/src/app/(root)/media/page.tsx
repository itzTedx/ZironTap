import { MediaLibraryView } from "@/features/media/views/media-library-view";

export default function MediaPage() {
	return (
		<div className="h-screen md:grid md:grid-cols-[250px_minmax(0,1fr)]">
			<div className="h-full shrink-0 bg-sidebar p-4">Sidebar Placeholder</div>
			<div className="grow">
				<MediaLibraryView />
			</div>
		</div>
	);
}
