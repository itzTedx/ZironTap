"use client";

/**
 * jalco-ui
 * JsonViewer
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Collapsible, syntax-colored JSON tree with path copying, search, and
 * 65 editor color themes powered by shiki.
 * Designed for dev dashboards, API documentation, and debugging tools.
 *
 * Props:
 * - data: any JSON-serializable value
 * - title?: heading label
 * - rootName?: label for the root node (default "root")
 * - defaultExpanded?: depth to expand by default (default 1), or true for all
 * - colorTheme?: shiki theme name or custom JsonColorTheme object
 * - className?: additional CSS classes
 *
 * Dependencies: lucide-react
 */

import * as React from "react";

import { Check, ChevronRight, Copy, CopyPlus, FoldHorizontal, Search, UnfoldHorizontal, X } from "lucide-react";

import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { cn } from "@ziron/ui/lib/utils";

import { type JsonColorTheme, jsonThemes, type ShikiThemeName } from "@/lib/themes";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const ThemeContext = React.createContext<JsonColorTheme | null>(null);

function useThemeColors(): JsonColorTheme | null {
	return React.use(ThemeContext);
}

function typeOf(value: JsonValue): string {
	if (value === null) return "null";
	if (Array.isArray(value)) return "array";
	return typeof value;
}

function countEntries(value: JsonValue): number {
	if (Array.isArray(value)) return value.length;
	if (value !== null && typeof value === "object") return Object.keys(value).length;
	return 0;
}

function buildPath(parent: string, key: string | number): string {
	if (parent === "") return String(key);
	if (typeof key === "number") return `${parent}[${key}]`;
	if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) return `${parent}.${key}`;
	return `${parent}["${key}"]`;
}

function matchesSearch(key: string | number, value: JsonValue, query: string): boolean {
	const q = query.toLowerCase();
	if (String(key).toLowerCase().includes(q)) return true;
	if (value === null) return "null".includes(q);
	if (typeof value !== "object") return String(value).toLowerCase().includes(q);
	return false;
}

function hasSearchMatch(value: JsonValue, key: string | number, query: string): boolean {
	if (!query) return false;
	if (matchesSearch(key, value, query)) return true;
	if (value !== null && typeof value === "object") {
		const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value);
		return entries.some(([k, v]) => hasSearchMatch(v, k, query));
	}
	return false;
}

function TokenSpan({
	token,
	children,
	className,
	italic,
}: {
	token: keyof JsonColorTheme;
	children: React.ReactNode;
	className?: string;
	italic?: boolean;
}) {
	const theme = useThemeColors();

	if (theme) {
		return (
			<span className={className} style={{ color: theme[token], fontStyle: italic ? "italic" : undefined }}>
				{children}
			</span>
		);
	}

	const fallbackMap: Record<string, string> = {
		key: "text-violet-600 dark:text-violet-400",
		string: "text-emerald-600 dark:text-emerald-400",
		number: "text-sky-600 dark:text-sky-400",
		boolean: "text-amber-600 dark:text-amber-400",
		null: "text-muted-foreground/60",
		punctuation: "text-muted-foreground",
		fg: "",
		bg: "",
	};

	return <span className={cn(fallbackMap[token], italic && "italic", className)}>{children}</span>;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
	if (!query) return <>{text}</>;

	const idx = text.toLowerCase().indexOf(query.toLowerCase());
	if (idx === -1) return <>{text}</>;

	return (
		<>
			{text.slice(0, idx)}
			<mark className="rounded-sm bg-amber-200/60 px-0.5 text-inherit dark:bg-amber-500/30">
				{text.slice(idx, idx + query.length)}
			</mark>
			{text.slice(idx + query.length)}
		</>
	);
}

interface JsonNodeProps {
	keyName: string | number;
	value: JsonValue;
	path: string;
	depth: number;
	defaultExpanded: number | true;
	searchQuery: string;
	collapsedPaths: Set<string>;
	onToggle: (path: string) => void;
	isLast: boolean;
}

function JsonNode({
	keyName,
	value,
	path,
	depth,
	defaultExpanded,
	searchQuery,
	collapsedPaths,
	onToggle,
	isLast,
}: JsonNodeProps) {
	const theme = useThemeColors();
	const type = typeOf(value);
	const isExpandable = type === "object" || type === "array";
	const count = isExpandable ? countEntries(value) : 0;

	const isCollapsed = collapsedPaths.has(path);
	const isExpanded = isExpandable && !isCollapsed;

	const openBracket = type === "array" ? "[" : "{";
	const closeBracket = type === "array" ? "]" : "}";
	const comma = isLast ? "" : ",";

	const nodeMatches = searchQuery && matchesSearch(keyName, value, searchQuery);

	const handleToggle = React.useCallback(() => {
		if (isExpandable) onToggle(path);
	}, [isExpandable, onToggle, path]);

	const [pathCopied, setPathCopied] = React.useState(false);

	const handleCopyPath = React.useCallback(() => {
		navigator.clipboard.writeText(path).then(() => {
			setPathCopied(true);
			setTimeout(() => setPathCopied(false), 1500);
		});
	}, [path]);

	const hoverBg = theme ? `${theme.fg}10` : undefined;

	const rowClass = cn(
		"group flex items-center gap-0 py-px",
		!theme && "hover:bg-muted/40",
		!theme && nodeMatches && "bg-amber-100/40 dark:bg-amber-900/20"
	);

	const rowStyle: React.CSSProperties = {
		paddingLeft: `${depth * 20 + 8}px`,
		...(theme && nodeMatches ? { backgroundColor: `${theme.fg}15` } : {}),
	};

	const copyIconClass = cn(
		"ml-1 inline-flex items-center justify-center rounded p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		theme
			? "hover:!opacity-100 opacity-0 group-hover:opacity-60"
			: "text-muted-foreground/0 hover:text-foreground! focus-visible:text-muted-foreground group-hover:text-muted-foreground"
	);

	function renderKey() {
		return (
			<TokenSpan token="key">
				{typeof keyName === "string" ? (
					<>
						&quot;
						<HighlightMatch query={searchQuery} text={keyName} />
						&quot;
					</>
				) : (
					keyName
				)}
			</TokenSpan>
		);
	}

	function renderValue() {
		if (typeof value === "string") {
			return (
				<TokenSpan token="string">
					&quot;
					<HighlightMatch query={searchQuery} text={value} />
					&quot;
				</TokenSpan>
			);
		}
		if (value === null) {
			return (
				<TokenSpan italic token="null">
					{searchQuery ? <HighlightMatch query={searchQuery} text="null" /> : "null"}
				</TokenSpan>
			);
		}
		if (typeof value === "number") {
			return (
				<TokenSpan token="number">
					<HighlightMatch query={searchQuery} text={String(value)} />
				</TokenSpan>
			);
		}
		if (typeof value === "boolean") {
			return (
				<TokenSpan token="boolean">
					<HighlightMatch query={searchQuery} text={String(value)} />
				</TokenSpan>
			);
		}
		return <span>{String(value)}</span>;
	}

	if (!isExpandable) {
		return (
			<div
				className={rowClass}
				onMouseEnter={
					theme
						? (e) => {
								e.currentTarget.style.backgroundColor = hoverBg ?? "";
							}
						: undefined
				}
				onMouseLeave={
					theme
						? (e) => {
								e.currentTarget.style.backgroundColor = nodeMatches ? `${theme.fg}15` : "";
							}
						: undefined
				}
				style={rowStyle}
			>
				<span className="w-4 shrink-0" />
				<span className="font-mono text-xs">
					{renderKey()}
					<TokenSpan token="punctuation">: </TokenSpan>
					{renderValue()}
					<TokenSpan token="punctuation">{comma}</TokenSpan>
				</span>
				<button
					aria-label={`Copy path: ${path}`}
					className={copyIconClass}
					onClick={handleCopyPath}
					style={theme ? { color: theme.fg } : undefined}
					type="button"
				>
					{pathCopied ? <CopyPlus className="size-3 text-emerald-500" /> : <CopyPlus className="size-3" />}
				</button>
			</div>
		);
	}

	const entries = Array.isArray(value)
		? value.map((v, i) => [i, v] as [number, JsonValue])
		: (Object.entries(value as Record<string, JsonValue>) as [string, JsonValue][]);

	const filteredEntries = searchQuery ? entries.filter(([k, v]) => hasSearchMatch(v, k, searchQuery)) : entries;
	const showAll = !searchQuery;
	const displayEntries = showAll ? entries : filteredEntries;

	return (
		<div>
			<div
				className={rowClass}
				onMouseEnter={
					theme
						? (e) => {
								e.currentTarget.style.backgroundColor = hoverBg ?? "";
							}
						: undefined
				}
				onMouseLeave={
					theme
						? (e) => {
								e.currentTarget.style.backgroundColor = nodeMatches ? `${theme.fg}15` : "";
							}
						: undefined
				}
				style={rowStyle}
			>
				<button
					aria-label={isExpanded ? "Collapse" : "Expand"}
					className="flex size-4 shrink-0 items-center justify-center transition-transform"
					onClick={handleToggle}
					style={theme ? { color: theme.punctuation } : undefined}
					type="button"
				>
					<ChevronRight
						className={cn(
							"size-3 transition-transform",
							isExpanded && "rotate-90",
							!theme && "text-muted-foreground"
						)}
					/>
				</button>
				<span className="font-mono text-xs">
					{renderKey()}
					<TokenSpan token="punctuation">: </TokenSpan>
					<TokenSpan token="punctuation">{openBracket}</TokenSpan>
					{!isExpanded && (
						<>
							<span
								className={cn("mx-1 text-[10px]", !theme && "text-muted-foreground/60")}
								style={theme ? { color: `${theme.fg}60` } : undefined}
							>
								{count} {count === 1 ? "item" : "items"}
							</span>
							<TokenSpan token="punctuation">
								{closeBracket}
								{comma}
							</TokenSpan>
						</>
					)}
				</span>
				<button
					aria-label={`Copy path: ${path}`}
					className={copyIconClass}
					onClick={handleCopyPath}
					style={theme ? { color: theme.fg } : undefined}
					type="button"
				>
					{pathCopied ? <CopyPlus className="size-3 text-emerald-500" /> : <CopyPlus className="size-3" />}
				</button>
			</div>

			{isExpanded && (
				<>
					{displayEntries.map(([k, v], i) => (
						<JsonNode
							collapsedPaths={collapsedPaths}
							defaultExpanded={defaultExpanded}
							depth={depth + 1}
							isLast={i === displayEntries.length - 1}
							key={`${k}-${i}`}
							keyName={k}
							onToggle={onToggle}
							path={buildPath(path, k)}
							searchQuery={searchQuery}
							value={v}
						/>
					))}
					<div
						className={cn("font-mono text-xs", !theme && "text-muted-foreground")}
						style={{
							paddingLeft: `${depth * 20 + 8 + 16}px`,
							...(theme ? { color: theme.punctuation } : {}),
						}}
					>
						{closeBracket}
						{comma}
					</div>
				</>
			)}
		</div>
	);
}

function collectPaths(
	value: JsonValue,
	path: string,
	maxDepth: number | true,
	depth: number,
	result: Set<string>
): void {
	if (value === null || typeof value !== "object") return;
	if (maxDepth !== true && depth >= maxDepth) {
		result.add(path);
	}
	const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value);
	for (const [k, v] of entries) {
		collectPaths(v, buildPath(path, k), maxDepth, depth + 1, result);
	}
}

function allExpandablePaths(value: JsonValue, rootName: string): Set<string> {
	const result = new Set<string>();
	collectAllExpandable(value, rootName, result);
	return result;
}

function collectAllExpandable(value: JsonValue, path: string, result: Set<string>): void {
	if (value === null || typeof value !== "object") return;
	result.add(path);
	const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value);
	for (const [k, v] of entries) {
		collectAllExpandable(v, buildPath(path, k), result);
	}
}

function resolveTheme(theme: ShikiThemeName | JsonColorTheme | undefined): JsonColorTheme | null {
	if (!theme) return null;
	if (typeof theme === "string") return jsonThemes[theme] ?? null;
	return theme;
}

interface JsonViewerProps extends Omit<React.ComponentProps<"div">, "children" | "title"> {
	/** Any JSON-serializable value to display. */
	data: JsonValue;
	/** Optional heading label. */
	title?: string;
	/** Label for the root node. Defaults to "root". */
	rootName?: string;
	/**
	 * Depth to expand by default.
	 * - Number: expand nodes up to this depth (default 1)
	 * - `true`: expand all nodes
	 */
	defaultExpanded?: number | true;
	/**
	 * Editor color theme. Pass a shiki theme name (e.g. "dracula", "github-dark")
	 * or a custom JsonColorTheme object. When omitted, uses Tailwind theme colors.
	 */
	colorTheme?: ShikiThemeName | JsonColorTheme;
}

function JsonViewer({
	data,
	title,
	rootName = "root",
	defaultExpanded = 1,
	colorTheme,
	className,
	...props
}: JsonViewerProps) {
	const resolved = resolveTheme(colorTheme);

	const [collapsedPaths, setCollapsedPaths] = React.useState<Set<string>>(() => {
		if (defaultExpanded === true) return new Set();
		const collapsed = new Set<string>();
		collectPaths(data, rootName, defaultExpanded, 0, collapsed);
		return collapsed;
	});
	const [searchQuery, setSearchQuery] = React.useState("");
	const [searchOpen, setSearchOpen] = React.useState(false);
	const [copiedAll, setCopiedAll] = React.useState(false);
	const searchRef = React.useRef<HTMLInputElement>(null);

	const togglePath = React.useCallback((path: string) => {
		setCollapsedPaths((prev) => {
			const next = new Set(prev);
			if (next.has(path)) {
				next.delete(path);
			} else {
				next.add(path);
			}
			return next;
		});
	}, []);

	const expandAll = React.useCallback(() => {
		setCollapsedPaths(new Set());
	}, []);

	const collapseAll = React.useCallback(() => {
		const all = allExpandablePaths(data, rootName);
		setCollapsedPaths(all);
	}, [data, rootName]);

	const copyJson = React.useCallback(() => {
		navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
			setCopiedAll(true);
			setTimeout(() => setCopiedAll(false), 1500);
		});
	}, [data]);

	const toggleSearch = React.useCallback(() => {
		setSearchOpen((prev) => {
			if (!prev) {
				requestAnimationFrame(() => searchRef.current?.focus());
			} else {
				setSearchQuery("");
			}
			return !prev;
		});
	}, []);

	React.useEffect(() => {
		if (searchQuery) {
			setCollapsedPaths(new Set());
		}
	}, [searchQuery]);

	const isExpandable = data !== null && typeof data === "object";
	const type = typeOf(data);

	return (
		<ThemeContext value={resolved}>
			<div
				className={cn("h-120 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm", className)}
				data-slot="json-viewer"
				{...props}
			>
				{/* Toolbar */}
				<div className="sticky top-0 z-50 flex items-center justify-between border-border/40 border-b px-3 py-2 backdrop-blur-lg sm:px-4">
					<div className="flex items-center gap-2">
						{title && <h3 className="font-semibold text-foreground text-sm">{title}</h3>}
						{isExpandable && (
							<span className="rounded-full bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground">
								{countEntries(data)} {type === "array" ? "items" : "keys"}
							</span>
						)}
					</div>
					<div className="flex items-center gap-0.5">
						<button
							aria-label={searchOpen ? "Close search" : "Search"}
							className={cn(
								"inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								searchOpen && "bg-muted text-foreground"
							)}
							onClick={toggleSearch}
							type="button"
						>
							<Search className="size-3.5" />
						</button>
						<button
							aria-label="Expand all"
							className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							onClick={expandAll}
							type="button"
						>
							<UnfoldHorizontal className="size-3.5" />
						</button>
						<button
							aria-label="Collapse all"
							className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							onClick={collapseAll}
							type="button"
						>
							<FoldHorizontal className="size-3.5" />
						</button>
						<button
							aria-label="Copy JSON"
							className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							onClick={copyJson}
							type="button"
						>
							{copiedAll ? (
								<Check className="size-3.5 text-emerald-500" />
							) : (
								<Copy className="size-3.5" />
							)}
						</button>
					</div>
				</div>

				{/* Search bar */}
				{searchOpen && (
					<div className="flex items-center gap-2 border-border/40 border-b bg-muted/20 px-3 py-1.5 sm:px-4">
						<Search className="size-3.5 shrink-0 text-muted-foreground" />
						<input
							className="min-w-0 flex-1 bg-transparent font-mono text-foreground text-xs placeholder:text-muted-foreground/50 focus:outline-none"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Filter keys and values…"
							ref={searchRef}
							type="text"
							value={searchQuery}
						/>
						{searchQuery && (
							<button
								aria-label="Clear search"
								className="inline-flex items-center justify-center rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
								onClick={() => setSearchQuery("")}
								type="button"
							>
								<X className="size-3" />
							</button>
						)}
					</div>
				)}
				<ScrollArea className="">
					{/* Tree */}
					<div
						className="overflow-auto py-1"
						style={
							resolved
								? {
										backgroundColor: resolved.bg,
										color: resolved.fg,
									}
								: undefined
						}
					>
						{isExpandable ? (
							<JsonNode
								collapsedPaths={collapsedPaths}
								defaultExpanded={defaultExpanded}
								depth={0}
								isLast
								keyName={rootName}
								onToggle={togglePath}
								path={rootName}
								searchQuery={searchQuery}
								value={data}
							/>
						) : (
							<div className="px-4 py-2 font-mono text-xs">
								<TokenSpan token="key">{rootName}</TokenSpan>
								<TokenSpan token="punctuation">: </TokenSpan>
								{typeof data === "string" ? (
									<TokenSpan token="string">&quot;{data}&quot;</TokenSpan>
								) : typeof data === "number" ? (
									<TokenSpan token="number">{String(data)}</TokenSpan>
								) : typeof data === "boolean" ? (
									<TokenSpan token="boolean">{String(data)}</TokenSpan>
								) : (
									<TokenSpan italic token="null">
										null
									</TokenSpan>
								)}
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</ThemeContext>
	);
}

export { JsonViewer, type JsonViewerProps, type JsonValue };
