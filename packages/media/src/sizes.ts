export type ImageFormat = "webp" | "image/webp" | "jpeg" | "image/jpeg" | "png" | "image/png";

export interface ImagePreset {
	width: number;
	height: number;
	quality: number;
	format: ImageFormat;
}

// Primary presets used by the portal image editor (profile/cover) and logo thumbnails.
export const PROFILE_IMAGE: ImagePreset = {
	width: 1080,
	height: 1080,
	quality: 0.85,
	format: "webp",
};

export const COVER_IMAGE: ImagePreset = {
	width: 1200,
	height: 630,
	quality: 0.85,
	format: "webp",
};

// Smaller variants for avatar + previews.
export const AVATAR: ImagePreset = {
	width: 512,
	height: 512,
	quality: 0.82,
	format: "webp",
};

export const THUMBNAIL: ImagePreset = {
	width: 256,
	height: 256,
	quality: 0.8,
	format: "webp",
};

// High-quality "full" variant for responsive rendering.
export const FULL: ImagePreset = {
	width: 2048,
	height: 2048,
	quality: 0.85,
	format: "webp",
};

export const PRESETS = {
	PROFILE_IMAGE,
	COVER_IMAGE,
	AVATAR,
	THUMBNAIL,
	FULL,
} as const;

export type ImagePresetKey = keyof typeof PRESETS;
