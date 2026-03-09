/** @type {import('@commitlint/types').UserConfig} */
export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// Type: one of allowed values, lowercase
		"type-enum": [
			2,
			"always",
			["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci", "revert"],
		],
		"type-case": [2, "always", "lower-case"],
		"type-empty": [2, "never"],

		// Scope: optional, lowercase when present (e.g. auth, qr, portal)
		"scope-case": [2, "always", "lower-case"],

		// Subject: imperative, no period; allow lowercase/mixed, forbid title/pascal/upper case
		"subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
		"subject-empty": [2, "never"],
		"subject-full-stop": [2, "never"],
		"header-max-length": [2, "always", 180],
		// Allow mixed-case header (brands, acronyms, etc.)
		"header-case": [0],

		// Only header line allowed; no body or footer
		"body-empty": [2, "always"],
		"footer-empty": [2, "always"],
	},
};
