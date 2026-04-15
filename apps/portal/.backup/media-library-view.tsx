"use client";

import { useCallback, useMemo, useState } from "react";

import { Separator } from "@ziron/ui/components/separator";

import { EmptyLibrary } from "../components/empty-library";
import { type MediaDraft, MediaDraftsPanel } from "../components/media-drafts-panel";
import { MediaLibraryHeader } from "../components/media-library-header";
import { MediaUploader, type UploadedMedia } from "../components/media-uploader";

function baseFilename(name: string) {
	return name.replace(/\.[^/.]+$/, "");
}

export const MediaLibraryView = () => {
	const [items, setItems] = useState<MediaDraft[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const handleUploaded = useCallback((payload: UploadedMedia) => {
		const id = payload.objectKey;

		setItems((prev) => {
			const next: MediaDraft = {
				id,
				objectKey: payload.objectKey,
				previewUrl: payload.previewUrl,
				rawFilename: payload.rawFilename,
				filename: baseFilename(payload.rawFilename) || payload.rawFilename,
				altText: "",
				tags: [],
				mimeType: payload.mimeType,
			};

			// Put the newest upload first.
			return [next, ...prev];
		});

		setSelectedId(id);
	}, []);

	const handleChange = useCallback((id: string, patch: Partial<MediaDraft>) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
	}, []);

	const uploadSlot = useMemo(() => <MediaUploader onUploaded={handleUploaded} />, [handleUploaded]);

	return (
		<div className="flex h-full flex-col">
			<MediaLibraryHeader />
			<Separator />
			<div className="grow overflow-hidden">
				{items.length === 0 ? (
					<EmptyLibrary onUploaded={handleUploaded} />
				) : (
					<MediaDraftsPanel
						items={items}
						onChange={handleChange}
						onSelect={setSelectedId}
						selectedId={selectedId}
						uploadSlot={uploadSlot}
					/>
				)}
			</div>
		</div>
	);
};
