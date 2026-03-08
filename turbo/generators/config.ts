import type { PlopTypes } from "@turbo/gen";

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const WORKSPACE_SCOPES = ["@ziron/"];
const SCOPE = "@ziron/";

interface PackageJson {
	name: string;
	version: string;
	type?: "module";
	private?: boolean;
	scripts: Record<string, string>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	exports?: Record<string, string>;
}

interface InitAnswers {
	name?: string;
	packageName?: string;
	packageType?: string;
	deps?: string;
}

function isWorkspaceDep(dep: string): boolean {
	return WORKSPACE_SCOPES.some((scope) => dep.startsWith(scope));
}

function normalizePackageName(input: string): string {
	return (
		input
			.replace(/^@ziron\//, "")
			.replace(/^@ziron\//, "")
			.trim() || "my-package"
	);
}

async function resolveDepVersion(dep: string): Promise<string> {
	if (isWorkspaceDep(dep)) return "workspace:*";

	try {
		const res = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`);
		const json = (await res.json()) as { latest?: string };
		return json?.latest ? `^${json.latest}` : "*";
	} catch {
		return "*";
	}
}

function getCatalogVersion(dep: string): string | null {
	try {
		const wsPath = join(process.cwd(), "pnpm-workspace.yaml");
		if (!existsSync(wsPath)) return null;
		const content = readFileSync(wsPath, "utf-8");
		const catalogMatch = content.match(/catalog:\s*([\s\S]*?)(?=\n\w|\n$)/);
		if (!catalogMatch?.[1]) return null;
		const catalog = catalogMatch[1];
		const key = dep.replace(/^@[^/]+\//, "").replace(/[^a-z0-9-]/gi, "");
		const re = new RegExp(`${key}:\\s*["']?([^"'\n]+)["']?`, "i");
		const m = catalog.match(re);
		return m?.[1]?.trim() ?? null;
	} catch {
		return null;
	}
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator("init", {
		description: "Generate a new package in packages/",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Package name (skip @ziron/ prefix):",
				default: "my-package",
				validate: (v) => (v?.trim() ? true : "Name is required"),
			},
			{
				type: "list",
				name: "packageType",
				message: "Package type:",
				choices: [
					{ name: "library (TS only, base.json)", value: "library" },
					{
						name: "react-library (JSX, react-library.json)",
						value: "react-library",
					},
				],
				default: "library",
			},
			{
				type: "input",
				name: "deps",
				message: "Dependencies (space-separated; @ziron/* → workspace:*):",
				default: "",
			},
		],
		actions: [
			(answers) => {
				const a = answers as InitAnswers;
				if (a.name) a.name = normalizePackageName(a.name);
				a.packageName = `${SCOPE}${a.name ?? "my-package"}`;
				return "Config sanitized";
			},
			{
				type: "add",
				path: "packages/{{ name }}/package.json",
				templateFile: "templates/package.json.hbs",
			},
			{
				type: "add",
				path: "packages/{{ name }}/tsconfig.json",
				templateFile: "templates/tsconfig.{{ packageType }}.json.hbs",
			},
			{
				type: "add",
				path: "packages/{{ name }}/src/index.ts",
				templateFile: "templates/src/index.ts.hbs",
			},
			{
				type: "add",
				path: "packages/{{ name }}/biome.json",
				templateFile: "templates/biome.json.hbs",
			},
			{
				type: "modify",
				path: "packages/{{ name }}/package.json",
				async transform(content, answers) {
					const depsInput = (answers.deps as string)?.trim();
					if (!depsInput) return content;

					const pkg = JSON.parse(content) as PackageJson;
					if (!pkg.dependencies) pkg.dependencies = {};
					if (!pkg.devDependencies) pkg.devDependencies = {};

					for (const dep of depsInput.split(/\s+/).filter(Boolean)) {
						const version = isWorkspaceDep(dep)
							? "workspace:*"
							: (getCatalogVersion(dep) ?? (await resolveDepVersion(dep)));
						const isDev =
							dep.startsWith("@types/") ||
							dep === "typescript" ||
							dep === "vitest" ||
							dep.includes("eslint") ||
							dep.includes("biome");
						const target = isDev ? pkg.devDependencies! : pkg.dependencies!;
						target[dep] = version;
					}
					return JSON.stringify(pkg, null, 2);
				},
			},
			async (answers) => {
				const name = (answers as InitAnswers).name;
				if (!name) return "Skipped";
				execSync("pnpm i", { stdio: "inherit" });
				try {
					execSync(`pnpm exec biome check --write packages/${name}`, {
						stdio: "inherit",
					});
				} catch {
					// Biome may not be set up yet
				}
				return "Package scaffolded";
			},
		],
	});
}
