"use client";

import { useUploadFile } from "@better-upload/client";
import { formatBytes } from "@better-upload/client/helpers";

import { toastManager } from "@ziron/ui/components/toast";

import { UploadButton } from "@/components/primitives/upload/upload-button";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

export const MediaUploader = () => {
	const { control } = useUploadFile({
		route: UPLOAD_ROUTES.logo,
		onError: (error) => {
			toastManager.add({ title: "Upload Error", description: error.message, type: "error" });
		},
		onUploadComplete: ({ file }) => {
			toastManager.add({
				title: "Upload successful",
				description: `File: ${file.raw.name ?? null}, Size: ${formatBytes(file.raw.size ?? 0)}`,
				type: "success",
			});
		},
	});

	return <UploadButton control={control} />;
};
