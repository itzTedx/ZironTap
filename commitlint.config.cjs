/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
	extends: ["@ziron/commitlint"],
	rules: {
		"header-max-length": [2, "always", 100],
	},
};
