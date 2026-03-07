/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
	forbidden: [
		{
			name: "no-circular",
			severity: "error",
			from: {},
			to: { circular: true },
		},
		{
			name: "packages-no-deps-on-apps",
			severity: "warn",
			from: { path: "^packages/" },
			to: { path: "^apps/" },
		},
		{
			name: "ui-no-deps-on-api",
			severity: "warn",
			from: { path: "^packages/ui" },
			to: { path: "^packages/api" },
		},
	],
	options: {
		doNotFollow: {
			path: ["node_modules", ".next", "dist", "build"],
		},
	},
};
