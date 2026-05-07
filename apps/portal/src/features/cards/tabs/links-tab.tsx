import { formatBytes } from "@better-upload/client/helpers";
import { InfoIcon } from "@phosphor-icons/react";
import { DotIcon, DotsSixVerticalIcon, PlusIcon, SpinnerIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Card, CardAction, CardFrame, CardHeader, CardPanel, CardTitle } from "@ziron/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@ziron/ui/components/input-group";
import { Progress } from "@ziron/ui/components/progress";
import { TabsPanel } from "@ziron/ui/components/tabs";

import { FileIcon } from "@/components/upload/upload-progress";

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
					<FieldGroup>
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
										<Button size="xs" type="button" variant="destructive-outline">
											<XIcon weight="bold" />
											<span className="sr-only">Edit</span>
										</Button>
									</CardAction>
								</CardHeader>
								<CardPanel className="px-3 pb-3">
									<FieldGroup className="grid grid-cols-[1fr_0.5fr] gap-3">
										<Field>
											<FieldLabel className="sr-only">Link</FieldLabel>
											<Input aria-label="Set your URL" placeholder="@username" />
										</Field>
										<Field>
											<FieldLabel className="sr-only">Link</FieldLabel>
											<InputGroup>
												<InputGroupInput aria-label="Set your URL" placeholder="Display Text" />
												<InputGroupAddon>
													<InputGroupText>
														<InfoIcon weight="fill" />
													</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
										</Field>
									</FieldGroup>
								</CardPanel>
							</Card>
						</CardFrame>
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
										<Button size="xs" type="button" variant="destructive-outline">
											<XIcon weight="bold" />
											<span className="sr-only">Edit</span>
										</Button>
									</CardAction>
								</CardHeader>
								<CardPanel className="px-3 pb-3">
									<FieldGroup className="grid grid-cols-[1fr_0.5fr] gap-3">
										<Field>
											<FieldLabel className="sr-only">Link</FieldLabel>
											<Input aria-label="Set your URL" placeholder="@username" />
										</Field>
										<Field>
											<FieldLabel className="sr-only">Link</FieldLabel>
											<InputGroup>
												<InputGroupInput aria-label="Set your URL" placeholder="Display Text" />
												<InputGroupAddon>
													<InputGroupText>
														<InfoIcon weight="fill" />
													</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
										</Field>
									</FieldGroup>
								</CardPanel>
							</Card>
						</CardFrame>
						<Button className="w-full" variant="secondary">
							<PlusIcon /> Add Link
						</Button>
					</FieldGroup>
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
