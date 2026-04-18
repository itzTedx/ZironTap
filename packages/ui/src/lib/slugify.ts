export type SlugifyOptions = {
	/** Maximum length of the result. Defaults to 64 to match `slugSchema` in `@ziron/validators`. */
	maxLength?: number;
};

/**
 * Turns arbitrary text into a URL-safe slug: lowercase letters, digits, and hyphens only.
 * Strips diacritics (e.g. "Café" → "cafe").
 */
export function slugify(input: string, options?: SlugifyOptions): string {
	const maxLength = options?.maxLength ?? 64;
	const trimmed = input.trim();
	if (trimmed === "") {
		return "";
	}

	let result = trimmed
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/-{2,}/g, "-")
		.replace(/^-+|-+$/g, "");

	if (result.length > maxLength) {
		result = result.slice(0, maxLength).replace(/-+$/g, "");
	}

	return result;
}
