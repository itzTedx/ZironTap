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

		// Subject/header: imperative, no period, max length, all lowercase
		"subject-case": [2, "always", "lower-case"],
		"subject-empty": [2, "never"],
		"subject-full-stop": [2, "never"],
		"header-max-length": [2, "always", 100],
		// Entire header must be lowercase (no uppercase anywhere)
		"header-case": [2, "always", "lower-case"],

		// Only header line allowed; no body or footer
		"body-empty": [2, "always"],
		"footer-empty": [2, "always"],
	},
};
