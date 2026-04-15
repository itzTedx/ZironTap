import { type ImageFormat, type ImagePreset, type ImagePresetKey, PRESETS } from "./sizes";

export interface CompressAndResizeOptions {
	width: number;
	height: number;
	quality?: number;
	format?: ImageFormat;
}

type LoadedImage =
	| {
			type: "bitmap";
			width: number;
			height: number;
			drawImage: (ctx: CanvasRenderingContext2D, dx: number, dy: number, dw: number, dh: number) => void;
			close: () => void;
	  }
	| {
			type: "element";
			width: number;
			height: number;
			drawImage: (ctx: CanvasRenderingContext2D, dx: number, dy: number, dw: number, dh: number) => void;
	  };

function normalizeMimeType(format: ImageFormat | undefined) {
	if (!format) return { mimeType: "image/webp" as const };
	if (format === "webp" || format === "image/webp") return { mimeType: "image/webp" as const };
	if (format === "jpeg" || format === "image/jpeg") return { mimeType: "image/jpeg" as const };
	if (format === "png" || format === "image/png") return { mimeType: "image/png" as const };

	return { mimeType: format };
}

async function loadImageFromBlob(blob: Blob): Promise<LoadedImage> {
	if (typeof window === "undefined") {
		throw new Error("compressAndResize must run in the browser");
	}

	const blobType = blob.type ?? "";
	if (!blobType.startsWith("image/")) {
		throw new Error(`Unsupported blob type: ${blobType || "unknown"}`);
	}

	// Prefer ImageBitmap when available (faster, avoids layout).
	if ("createImageBitmap" in window) {
		try {
			const bitmap = await window.createImageBitmap(blob);
			return {
				type: "bitmap",
				width: bitmap.width,
				height: bitmap.height,
				drawImage: (ctx, dx, dy, dw, dh) => {
					ctx.drawImage(bitmap, dx, dy, dw, dh);
				},
				close: () => bitmap.close(),
			};
		} catch {
			// Fall back to HTMLImageElement.
		}
	}

	const objectUrl = URL.createObjectURL(blob);

	try {
		const image = await new Promise<HTMLImageElement>((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error("Failed to decode image"));
			img.src = objectUrl;
		});

		return {
			type: "element",
			width: image.naturalWidth,
			height: image.naturalHeight,
			drawImage: (ctx, dx, dy, dw, dh) => {
				ctx.drawImage(image, dx, dy, dw, dh);
			},
		};
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}

function toBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number) {
	return new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					reject(new Error("Failed to export resized blob"));
					return;
				}
				resolve(blob);
			},
			mimeType,
			quality
		);
	});
}

export async function compressAndResize(blob: Blob, options: CompressAndResizeOptions): Promise<Blob> {
	const { mimeType } = normalizeMimeType(options.format);
	const quality = options.quality ?? 0.85;

	const loaded = await loadImageFromBlob(blob);
	try {
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(options.width));
		canvas.height = Math.max(1, Math.round(options.height));

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get canvas 2d context");
		}

		// Contain scaling to avoid distortion. Profile/cover crops should already match aspect ratio.
		const scale = Math.min(canvas.width / loaded.width, canvas.height / loaded.height);
		const dw = Math.max(1, Math.round(loaded.width * scale));
		const dh = Math.max(1, Math.round(loaded.height * scale));
		const dx = Math.round((canvas.width - dw) / 2);
		const dy = Math.round((canvas.height - dh) / 2);

		loaded.drawImage(ctx, dx, dy, dw, dh);

		// Ensure we always export at the requested format; quality is only used for lossy encoders.
		return await toBlob(canvas, mimeType, quality);
	} finally {
		if (loaded.type === "bitmap") loaded.close();
	}
}

export interface ProcessIntoPresetsOptions {
	quality?: number;
	format?: ImageFormat;
	presetKeys?: readonly ImagePresetKey[];
}

export async function processIntoPresets(
	blob: Blob,
	options: ProcessIntoPresetsOptions = {}
): Promise<Record<ImagePresetKey, Blob>> {
	const presetKeys = options.presetKeys ?? (Object.keys(PRESETS) as ImagePresetKey[]);

	const results = await Promise.all(
		presetKeys.map(async (key) => {
			const preset: ImagePreset = PRESETS[key];

			const processed = await compressAndResize(blob, {
				width: preset.width,
				height: preset.height,
				quality: options.quality ?? preset.quality,
				format: options.format ?? preset.format,
			});

			return [key, processed] as const;
		})
	);

	return Object.fromEntries(results) as Record<ImagePresetKey, Blob>;
}
