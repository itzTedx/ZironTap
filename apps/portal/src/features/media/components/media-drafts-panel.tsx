"use client";

import { type ReactNode, useMemo, useState } from "react";

import { Plus, X } from "lucide-react";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Checkbox } from "@ziron/ui/components/checkbox";
import { Input } from "@ziron/ui/components/input";
import { Separator } from "@ziron/ui/components/separator";
import { cn } from "@ziron/ui/lib/utils";

export type MediaDraft = {
	id: string;
	objectKey: string;
	previewUrl: string;
	rawFilename: string;

	// Editable metadata.
	filename: string;
	altText: string;
	tags: string[];

	mimeType: string;
};

type MediaDraftsPanelProps = {
	items: MediaDraft[];
	selectedId: string | null;
	uploadSlot?: ReactNode;
	onSelect: (id: string) => void;
	onChange: (id: string, patch: Partial<MediaDraft>) => void;
};

function TagsEditor({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) {
	const [input, setInput] = useState("");

	const normalizedExisting = useMemo(
		() => new Set(value.map((t) => t.trim().toLowerCase()).filter(Boolean)),
		[value]
	);

	const addTagsFromInput = () => {
		const raw = input.trim();
		if (!raw) return;

		const nextTags = raw
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean)
			.filter((t) => !normalizedExisting.has(t.toLowerCase()));

		if (nextTags.length === 0) {
			setInput("");
			return;
		}

		onChange([...value, ...nextTags]);
		setInput("");
	};

	return (
		<div className="space-y-2">
			<div className="font-medium text-sm">Tags</div>
			<div className="flex items-center gap-2">
				<Input
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key !== "Enter") return;
						e.preventDefault();
						addTagsFromInput();
					}}
					placeholder="Add or create a new tag"
					value={input}
				/>
				<Button aria-label="Add tag(s)" onClick={addTagsFromInput} size="icon" type="button" variant="outline">
					<Plus aria-hidden="true" />
				</Button>
			</div>

			<div className="flex flex-wrap gap-2">
				{value.length === 0 ? (
					<div className="text-muted-foreground text-xs">No tags yet</div>
				) : (
					value.map((tag) => (
						<span className="flex items-center gap-1" key={tag}>
							<Badge size="sm" variant="outline">
								{tag}
							</Badge>
							<Button
								aria-label={`Remove tag ${tag}`}
								className="h-6 w-6"
								onClick={() => onChange(value.filter((t) => t !== tag))}
								size="icon"
								type="button"
								variant="outline"
							>
								<X aria-hidden="true" className="size-3.5" />
							</Button>
						</span>
					))
				)}
			</div>
		</div>
	);
}

export function MediaDraftsPanel({ items, selectedId, uploadSlot, onSelect, onChange }: MediaDraftsPanelProps) {
	const selected = useMemo(() => items.find((i) => i.id === selectedId) ?? null, [items, selectedId]);
	const [showMore, setShowMore] = useState(true);

	return (
		<div className="grid h-full grid-cols-[360px_minmax(0,1fr)] overflow-hidden">
			<aside className="flex min-w-0 flex-col border-r">
				<div className="flex items-center justify-between gap-3 border-b p-3">
					<div className="min-w-0">
						<div className="font-medium text-sm">Images</div>
						<div className="truncate text-muted-foreground text-xs">{items.length} item(s)</div>
					</div>
					{uploadSlot}
				</div>

				<div className="flex-1 overflow-auto p-2">
					<div className="space-y-2">
						{items.map((item: MediaDraft) => {
							const isSelected = item.id === selectedId;
							return (
								<button
									className={cn(
										"flex w-full items-center gap-3 rounded-md border bg-background p-2 text-left transition-colors hover:bg-muted/40",
										isSelected && "border-ring"
									)}
									key={item.id}
									onClick={() => onSelect(item.id)}
									type="button"
								>
									<div className="shrink-0">
										<Checkbox checked={isSelected} onCheckedChange={() => onSelect(item.id)} />
									</div>

									<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border bg-muted">
										<img
											alt={item.filename}
											className="h-full w-full object-cover"
											src={item.previewUrl}
										/>
									</div>

									<div className="min-w-0 flex-1">
										<div className="truncate font-medium text-sm">
											{item.filename || item.rawFilename}
										</div>
										<div className="truncate text-muted-foreground text-xs">{item.rawFilename}</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</aside>

			<main className="flex min-w-0 flex-col">
				{selected ? (
					<>
						<div className="flex flex-1 flex-col overflow-hidden p-4">
							<div className="flex items-start gap-6 overflow-auto">
								<div className="w-[240px] shrink-0">
									<div className="overflow-hidden rounded border bg-muted">
										<img
											alt={selected.filename}
											className="h-56 w-full object-cover"
											src={selected.previewUrl}
										/>
									</div>
								</div>

								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-3">
										<div className="min-w-0">
											<div className="truncate font-medium text-sm">{selected.filename}</div>
											<div className="truncate text-muted-foreground text-xs">
												{selected.mimeType}
											</div>
										</div>
										<Button
											onClick={() => setShowMore((v) => !v)}
											size="sm"
											type="button"
											variant="outline"
										>
											More info
										</Button>
									</div>

									<Separator className="my-4" />

									<div className="space-y-4">
										<div className="space-y-2">
											<div className="font-medium text-sm">Filename</div>
											<Input
												onChange={(e) => onChange(selected.id, { filename: e.target.value })}
												value={selected.filename}
											/>
										</div>

										{showMore && (
											<>
												<div className="space-y-2">
													<div className="font-medium text-sm">Alternative text</div>
													<Input
														onChange={(e) =>
															onChange(selected.id, { altText: e.target.value })
														}
														value={selected.altText}
													/>
												</div>

												<TagsEditor
													onChange={(tags) => onChange(selected.id, { tags })}
													value={selected.tags}
												/>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
						Select an item to edit.
					</div>
				)}
			</main>
		</div>
	);
}
