export const COLOR_MODE = [
	{ label: "System", value: "system" },
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
] as const;

export const TEMPLATES = [
	{ label: "Default", value: "default", img: "/images/templates/default.svg" },
	{ label: "Compact", value: "compact", img: "/images/templates/compact.svg" },
	{ label: "Tiles", value: "tiles", img: "/images/templates/tiles.svg" },
] as const;

export const THEME_PRESET = [
	{
		label: "Default",
		value: "default",
		description: "Soft blue and pink gradients with a clean futuristic glow.",
		img: "/images/theme/default.png",
	},
	{
		label: "Sunset",
		value: "sunset",
		description: "Warm pink-orange gradients inspired by evening skies.",
		img: "/images/theme/sunset-purple.png",
	},
	{
		label: "Aurora",
		value: "aurora",
		description: "Soft pastel gradients inspired by northern lights.",
		img: "/images/theme/aurora.png",
	},
	{
		label: "Midnight",
		value: "midnight",
		description: "Cool blue-black palette for focused dark interfaces.",
		img: "/images/theme/midnight.png",
	},
	{
		label: "Obsidian",
		value: "obsidian",
		description: "Premium deep dark tones with subtle glowing accents.",
		img: "/images/theme/obsidian.png",
	},
	{
		label: "Solar",
		value: "solar",
		description: "Warm yellow-orange gradients inspired by sunlight.",
		img: "/images/theme/solar.png",
	},
	{
		label: "Ember",
		value: "ember",
		description: "Fiery red and orange tones with energetic contrast.",
		img: "/images/theme/ember.png",
	},
	{
		label: "Citrus",
		value: "citrus",
		description: "Fresh lime and orange palette with vibrant energy.",
		img: "/images/theme/citrus.png",
	},
	{
		label: "Bloom",
		value: "bloom",
		description: "Soft pink and peach gradients with a creative feel.",
		img: "/images/theme/bloom.png",
	},
	{
		label: "Neon",
		value: "neon",
		description: "Electric cyberpunk-inspired colors with glowing accents.",
		img: "/images/theme/neon.png",
	},
	{
		label: "Pulse",
		value: "pulse",
		description: "High-contrast neon tones built for dynamic UIs.",
		img: "/images/theme/pulse.png",
	},
	{
		label: "Arctic",
		value: "arctic",
		description: "Icy blues and frosty whites for a calm clean look.",
		img: "/images/theme/arctic.png",
	},
	{
		label: "Cosmic",
		value: "cosmic",
		description: "Purple-magenta gradients inspired by deep space.",
		img: "/images/theme/cosmic.png",
	},
] as const;
