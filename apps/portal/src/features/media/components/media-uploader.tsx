"use client";

import { useUploadFile } from "@better-upload/client";
import { formatBytes } from "@better-upload/client/helpers";

import { toastManager } from "@ziron/ui/components/toast";

import { UploadButton } from "@/components/upload/upload-button";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";
import { client } from "@/lib/orpc/client";

export type UploadedMedia = {
	assetId: string;
	objectKey: string;
	previewUrl: string;
	rawFilename: string;
	mimeType: string;
};

type MediaUploaderProps = {
	onUploaded?: (payload: UploadedMedia) => void;
	route?: (typeof UPLOAD_ROUTES)[keyof typeof UPLOAD_ROUTES];
};

export const MediaUploadButton = ({ onUploaded, route = UPLOAD_ROUTES.photo }: MediaUploaderProps) => {
	const { control } = useUploadFile({
		route,
		onError: (error) => {
			toastManager.add({ title: "Upload Error", description: error.message, type: "error" });
		},
		onUploadComplete: ({ file, metadata }) => {
			void (async () => {
				const previewUrl =
					typeof metadata?.url === "string"
						? metadata.url
						: typeof file.objectInfo.metadata?.url === "string"
							? file.objectInfo.metadata.url
							: "";

				if (!previewUrl) {
					toastManager.add({
						title: "Could not save to library",
						description: "Upload finished but no public file URL was returned.",
						type: "error",
					});
					return;
				}

				const objectKey = file.objectInfo.key;
				const rawFilename = file.raw.name ?? file.name;
				const fileSize = file.raw.size ?? 0;
				const mimeType = file.type;

				try {
					const asset = await client.media.upload({
						url: previewUrl,
						filename: rawFilename,
						fileSize,
						fileType: mimeType,
						storageKey: objectKey,
					});

					toastManager.add({
						title: "Upload successful",
						description: `File: ${rawFilename}, Size: ${formatBytes(fileSize)}`,
						type: "success",
					});

					onUploaded?.({
						assetId: asset.id,
						objectKey,
						previewUrl,
						rawFilename,
						mimeType,
					});
				} catch (error) {
					const message = error instanceof Error ? error.message : "Unknown error";
					toastManager.add({
						title: "Could not save to library",
						description: message,
						type: "error",
					});
				}
			})();
		},
	});

	return <UploadButton control={control} />;
};
