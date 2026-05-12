export const constructUrl = (base: string, path: string) => {
	return `${base}/${path.startsWith("/") ? path.slice(1) : path}`;
};

export const getPrettyUrl = (url?: string | null) => {
	if (!url) return "";
	// remove protocol (http/https) and www.
	// also remove trailing slash
	return url
		.replace(/(^\w+:|^)\/\//, "")
		.replace("www.", "")
		.replace(/\/$/, "");
};
