import { formatBytes } from "@better-upload/client/helpers";
import { DotIcon, DotsSixVerticalIcon, PlusIcon, SpinnerIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Card, CardAction, CardFrame, CardHeader, CardPanel, CardTitle } from "@ziron/ui/components/card";
import { FieldGroup } from "@ziron/ui/components/field";
import { Progress } from "@ziron/ui/components/progress";
import {
	Sortable,
	SortableContent,
	SortableItem,
	SortableItemHandle,
	SortableOverlay,
} from "@ziron/ui/components/sortable";
import { TabsPanel } from "@ziron/ui/components/tabs";

import { FileIcon } from "@/components/upload/upload-progress";

import { LinkRow } from "@/features/forms/components/link-row";
import { withForm } from "@/features/forms/hooks/use-app-form";
import { cardFormOpts } from "@/features/forms/options/cards-form-opts";

import { CollapsibleFrame } from "../components/collapsible-frame";

export const LinksTab = withForm({
	...cardFormOpts,
	props: {
		value: "tab",
	},
	render: ({ form, value }) => {
		return (
			<TabsPanel className="space-y-3" value={value}>
				<CollapsibleFrame title="Additional Fields">
					<form.Field mode="array" name="links">
						{(field) => {
							return (
								<FieldGroup>
									<Sortable
										getItemValue={(item) => item.order}
										onValueChange={field.handleChange}
										orientation="vertical"
										value={field.state.value ?? [{ label: "", url: "", order: 1 }]}
									>
										<SortableContent className="space-y-3">
											{field.state.value?.map((data, i) => (
												<SortableItem
													asChild
													key={`${Number(i)}-${data.url}`}
													value={data.order}
												>
													<CardFrame>
														<Card className="gap-0">
															<CardHeader className="items-center gap-0 p-2 px-3 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-2">
																<CardTitle className="flex items-center gap-1 text-sm">
																	<SortableItemHandle asChild>
																		<Button size="xs" type="button" variant="ghost">
																			<DotsSixVerticalIcon weight="bold" />
																		</Button>
																	</SortableItemHandle>
																	Instagram
																</CardTitle>
																<CardAction>
																	<Button
																		onClick={() => field.removeValue(i)}
																		size="xs"
																		type="button"
																		variant="destructive-outline"
																	>
																		<XIcon weight="bold" />
																		<span className="sr-only">Edit</span>
																	</Button>
																</CardAction>
															</CardHeader>
															<CardPanel className="px-3 pb-3">
																<LinkRow fields={`links[${i}]`} form={form} />
															</CardPanel>
														</Card>
													</CardFrame>
												</SortableItem>
											))}
										</SortableContent>
										<SortableOverlay>
											{(activeItem) => {
												const linksList = field.state.value ?? [];
												const activeOrder =
													typeof activeItem.value === "number"
														? activeItem.value
														: Number(activeItem.value);
												const activeIndex = linksList.findIndex(
													(link) => link.order === activeOrder
												);
												if (activeIndex < 0) return null;

												return (
													<SortableItem asChild value={activeItem.value}>
														<CardFrame>
															<Card className="gap-0">
																<CardHeader className="items-center gap-0 p-2 px-3 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-2">
																	<CardTitle className="flex items-center gap-1 text-sm">
																		<Button size="xs" type="button" variant="ghost">
																			<DotsSixVerticalIcon weight="bold" />
																		</Button>
																		Instagram
																	</CardTitle>
																	<CardAction>
																		<Button
																			onClick={() =>
																				field.removeValue(activeIndex)
																			}
																			size="xs"
																			type="button"
																			variant="destructive-outline"
																		>
																			<XIcon weight="bold" />
																			<span className="sr-only">Edit</span>
																		</Button>
																	</CardAction>
																</CardHeader>
																<CardPanel className="px-3 pb-3">
																	<LinkRow
																		fields={`links[${activeIndex}]`}
																		form={form}
																	/>
																</CardPanel>
															</Card>
														</CardFrame>
													</SortableItem>
												);
											}}
										</SortableOverlay>
									</Sortable>

									<Button
										className="w-full"
										onClick={() =>
											field.pushValue({
												label: "",
												url: "",
												order: (field.state.value?.length ?? 0) + 1,
											})
										}
										variant="secondary"
									>
										<PlusIcon /> Add Link
									</Button>
								</FieldGroup>
							);
						}}
					</form.Field>
				</CollapsibleFrame>
				<form.AppField name="coverImage">
					{(field) => (
						<field.CoverUploadField
							description="or, click to browse (4MB max)"
							helperText="Recommended size: 1200 x 630"
							label="Attachments"
						/>
					)}
				</form.AppField>
				<CollapsibleFrame className="space-y-3" title="Uploaded Files">
					{/* <PdfViewer className="max-h-130" file="/pdf/pitch-deck.pdf" initialZoom={1} mode="scroll" /> */}
					<div className="flex items-center gap-2 rounded-lg border bg-transparent p-3 dark:bg-input/10">
						<FileIcon type={"application/pdf"} />

						<div className="grid grow gap-1">
							<div className="flex items-center gap-0.5">
								<p className="max-w-40 truncate font-medium text-sm">Company Profile.pdf</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<p className="text-muted-foreground text-xs">{formatBytes(2520000)}</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<div className="flex items-center gap-1 text-muted-foreground text-sm">
									<SpinnerIcon className="animate-spin" /> <span>Uploading...</span>
								</div>
							</div>

							<div className="flex h-4 items-center">
								<Progress className="h-1.5" value={0.45 * 100} />
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 rounded-lg border bg-transparent p-3 dark:bg-input/10">
						<FileIcon type={"application/pdf"} />

						<div className="grid grow gap-1">
							<div className="flex items-center gap-0.5">
								<p className="max-w-40 truncate font-medium text-sm">Company Profile.pdf</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<p className="text-muted-foreground text-xs">{formatBytes(520000)}</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<div className="flex items-center gap-1 text-muted-foreground text-sm">
									<SpinnerIcon className="animate-spin" /> <span>Uploading...</span>
								</div>
							</div>

							<div className="flex h-4 items-center">
								<Progress className="h-1.5" value={0.95 * 100} />
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 rounded-lg border bg-transparent p-3 dark:bg-input/10">
						<FileIcon type={"application/pdf"} />

						<div className="grid grow gap-1">
							<div className="flex items-center gap-0.5">
								<p className="max-w-40 truncate font-medium text-sm">Company Profile.pdf</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<p className="text-muted-foreground text-xs">{formatBytes(4890000)}</p>
								<DotIcon className="size-4 text-muted-foreground" />
								<div className="flex items-center gap-1 text-muted-foreground text-sm">
									<SpinnerIcon className="animate-spin" /> <span>Uploading...</span>
								</div>
							</div>

							<div className="flex h-4 items-center">
								<Progress className="h-1.5" value={0.25 * 100} />
							</div>
						</div>
					</div>
				</CollapsibleFrame>
			</TabsPanel>
		);
	},
});
