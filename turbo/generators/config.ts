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
	devDeps?: string;
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

/** Extract package name from a catalog line (e.g. "  'pkg': ^1" or "  pkg: 1" -> "pkg"). */
function parseCatalogKey(line: string): string | null {
	const trimmed = line.trim();
	const colon = trimmed.indexOf(":");
	if (colon <= 0) return null;
	const key = trimmed.slice(0, colon).trim();
	const quoted = key.match(/^['"](.*)['"]$/);
	return (quoted?.[1] ?? key) || null;
}

/** Returns "catalog:name" or "catalog:" for default, or null if not in any catalog. */
function getCatalogRef(dep: string): string | null {
	try {
		const wsPath = join(process.cwd(), "pnpm-workspace.yaml");
		if (!existsSync(wsPath)) return null;
		const content = readFileSync(wsPath, "utf-8");
		const lines = content.split("\n");

		// Named catalogs: find "catalogs:" then each "  name:" block with "    key: val" lines
		const catalogsIdx = lines.findIndex((l) => /^catalogs:\s*$/.test(l));
		if (catalogsIdx >= 0) {
			for (let i = catalogsIdx + 1; i < lines.length; i++) {
				const nameMatch = lines[i]?.match(/^\s{2}(\w+):\s*$/);
				const catalogName = nameMatch?.[1];
				if (!nameMatch || !catalogName) break;
				i += 1;
				while (i < lines.length && /^\s{4}\S/.test(lines[i] ?? "")) {
					const line = lines[i];
					const key = line ? parseCatalogKey(line) : null;
					if (key === dep) return `catalog:${catalogName}`;
					i += 1;
				}
				i -= 1;
			}
		}

		// Default catalog: find "catalog:" then lines with "  key: val"
		const catalogIdx = lines.findIndex((l) => /^catalog:\s*$/.test(l));
		if (catalogIdx >= 0) {
			for (let i = catalogIdx + 1; i < lines.length; i++) {
				const line = lines[i];
				if (!line || !/^\s{2}\S/.test(line)) break;
				const key = parseCatalogKey(line);
				if (key === dep) return "catalog:";
			}
		}
		return null;
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
				message: "Dependencies (space-separated; catalog used when in pnpm-workspace):",
				default: "",
			},
			{
				type: "input",
				name: "devDeps",
				message: "Dev dependencies (space-separated, optional):",
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
					const depsInput = (answers.deps as string)?.trim() ?? "";
					const devDepsInput = (answers.devDeps as string)?.trim() ?? "";
					if (!depsInput && !devDepsInput) return content;

					const pkg = JSON.parse(content) as PackageJson;
					if (!pkg.dependencies) pkg.dependencies = {};
					if (!pkg.devDependencies) pkg.devDependencies = {};

					const resolveVersion = async (dep: string) =>
						isWorkspaceDep(dep) ? "workspace:*" : (getCatalogRef(dep) ?? (await resolveDepVersion(dep)));

					for (const dep of depsInput.split(/\s+/).filter(Boolean)) {
						pkg.dependencies![dep] = await resolveVersion(dep);
					}
					for (const dep of devDepsInput.split(/\s+/).filter(Boolean)) {
						pkg.devDependencies![dep] = await resolveVersion(dep);
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
