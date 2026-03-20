import { uploadFile } from "@better-upload/client";

import { compressAndResize, type ProcessIntoPresetsOptions } from "./process";
import { type ImageFormat, type ImagePresetKey, PRESETS } from "./sizes";

function getFileExtension(mimeType: string) {
	if (mimeType === "image/webp") return "webp";
	if (mimeType === "image/jpeg") return "jpeg";
	if (mimeType === "image/png") return "png";
	if (mimeType.endsWith("/webp")) return "webp";
	if (mimeType.endsWith("/jpeg")) return "jpeg";
	if (mimeType.endsWith("/jpg")) return "jpeg";
	if (mimeType.endsWith("/png")) return "png";

	// Best-effort fallback; S3 keys are still safe but extension may not match the encoder.
	return "bin";
}

export interface UploadProcessedFileOptions {
	route: string;
	fileBaseName?: string;
	blob: Blob;
	width: number;
	height: number;
	quality?: number;
	format?: ImageFormat;
	metadata?: Record<string, unknown>;
	api?: string;
}

export async function uploadProcessedFile({
	route,
	fileBaseName = "image",
	blob,
	width,
	height,
	quality,
	format = "webp",
	metadata,
	api,
}: UploadProcessedFileOptions) {
	const processedBlob = await compressAndResize(blob, { width, height, quality, format });

	const mimeType = processedBlob.type || "image/webp";
	const fileExtension = getFileExtension(mimeType);
	const fileName = `${fileBaseName}.${fileExtension}`;
	const file = new File([processedBlob], fileName, { type: mimeType });

	return uploadFile({
		api,
		route,
		file,
		metadata,
	});
}

export interface UploadProcessedPresetsOptions {
	route: string;
	fileBaseName?: string;
	blob: Blob;
	// Optional override for which presets to generate and upload.
	presetKeys?: readonly ImagePresetKey[];
	quality?: number;
	format?: ImageFormat;
	metadata?: Record<string, unknown>;
	api?: string;
}

export async function uploadProcessedPresets({
	route,
	fileBaseName = "image",
	blob,
	presetKeys,
	quality,
	format,
	metadata,
	api,
}: UploadProcessedPresetsOptions) {
	const keys = presetKeys ?? (Object.keys(PRESETS) as ImagePresetKey[]);

	// Upload each size; Better Upload will sign + stream the file.
	return Promise.all(
		keys.map(async (key) => {
			const preset = PRESETS[key];

			const processedBlob = await compressAndResize(blob, {
				width: preset.width,
				height: preset.height,
				quality: quality ?? preset.quality,
				format: format ?? preset.format,
			});

			const mimeType = processedBlob.type || "image/webp";
			const fileExtension = getFileExtension(mimeType);
			const fileName = `${fileBaseName}-${key}.${fileExtension}`;
			const file = new File([processedBlob], fileName, { type: mimeType });

			return uploadFile({
				api,
				route,
				file,
				metadata,
			}).then((result) => ({ key, result }));
		})
	);
}

export type { ProcessIntoPresetsOptions };
