"use client";

import { useUploadFile } from "@better-upload/client";
import { formatBytes } from "@better-upload/client/helpers";

import { toastManager } from "@ziron/ui/components/toast";

import { UploadButton } from "@/components/primitives/upload/upload-button";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

export type UploadedMedia = {
	objectKey: string;
	previewUrl: string;
	rawFilename: string;
	mimeType: string;
};

type MediaUploaderProps = {
	onUploaded?: (payload: UploadedMedia) => void;
	route?: (typeof UPLOAD_ROUTES)[keyof typeof UPLOAD_ROUTES];
};

export const MediaUploader = ({ onUploaded, route = UPLOAD_ROUTES.photo }: MediaUploaderProps) => {
	const { control } = useUploadFile({
		route,
		onError: (error) => {
			toastManager.add({ title: "Upload Error", description: error.message, type: "error" });
		},
		onUploadComplete: ({ file, metadata }) => {
			const previewUrl =
				typeof metadata?.url === "string"
					? metadata.url
					: typeof file.objectInfo.metadata?.url === "string"
						? file.objectInfo.metadata.url
						: "";

			toastManager.add({
				title: "Upload successful",
				description: `File: ${file.raw.name ?? null}, Size: ${formatBytes(file.raw.size ?? 0)}`,
				type: "success",
			});

			onUploaded?.({
				objectKey: file.objectInfo.key,
				previewUrl,
				rawFilename: file.raw.name ?? file.name,
				mimeType: file.type,
			});
		},
	});

	return <UploadButton control={control} />;
};
