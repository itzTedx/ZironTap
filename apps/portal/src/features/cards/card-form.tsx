"use client";

import Image from "next/image";

import { formatBytes } from "@better-upload/client/helpers";
import { InfoIcon, LinkSimpleIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import {
	ChartPieSliceIcon,
	DotIcon,
	DotsSixVerticalIcon,
	PencilCircleIcon,
	PlusIcon,
	SpinnerIcon,
	XIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Card, CardAction, CardFrame, CardHeader, CardPanel, CardTitle } from "@ziron/ui/components/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@ziron/ui/components/empty";
import { Field, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Fieldset, FieldsetLegend } from "@ziron/ui/components/fieldset";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@ziron/ui/components/input-group";
import { Progress } from "@ziron/ui/components/progress";
import { Radio, RadioGroup } from "@ziron/ui/components/radio-group";
import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ziron/ui/components/tabs";

import PhoneMockup from "@/components/layout/preview/iphone";
import { FileIcon } from "@/components/upload/upload-progress";

import { useAppForm } from "../forms/hooks/use-app-form";
import { cardFormOpts } from "../forms/options/cards-form-opts";
import { CollapsibleFrame } from "./components/collapsible-frame";
import { GeneralTab } from "./components/fields/general-tab";
import { ProfileHero } from "./components/fields/profile-hero";

const TABS = [
	{
		icon: <UserCircleDashedIcon weight="fill" />,
		title: "General",
		value: "general",
	},
	{
		icon: <LinkSimpleIcon weight="bold" />,
		title: "Links",
		value: "links",
	},
	{
		icon: <PencilCircleIcon weight="fill" />,
		title: "Customization",
		value: "customization",
	},
	{
		icon: <ChartPieSliceIcon weight="fill" />,
		title: "Analytics",
		value: "analytics",
	},
] as const;

const items = [
	{ label: "System", value: "system" },
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
] as const;

export const CardForm = () => {
	const form = useAppForm({
		...cardFormOpts,
		onSubmit: ({ value }) => {
			console.log("FORM VALUES:", value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="grid md:grid-cols-[1fr_360px]">
				<ScrollArea className="h-full">
					<FieldGroup className="container mt-4 mb-24 max-w-4xl">
						<ProfileHero form={form} />

						<Tabs defaultValue="general">
							<TabsList className="w-full">
								{TABS.map(({ icon, value, title }) => (
									<TabsTab key={value} value={value}>
										{icon}
										{title}
									</TabsTab>
								))}
							</TabsList>
							<GeneralTab form={form} value="general" />
							<TabsPanel className="space-y-3" value="links">
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
																<InputGroupInput
																	aria-label="Set your URL"
																	placeholder="Display Text"
																/>
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
																<InputGroupInput
																	aria-label="Set your URL"
																	placeholder="Display Text"
																/>
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
									<div className="flex items-center gap-2 rounded-lg border bg-transparent p-3 dark:bg-input/10">
										<FileIcon type={"application/pdf"} />

										<div className="grid grow gap-1">
											<div className="flex items-center gap-0.5">
												<p className="max-w-40 truncate font-medium text-sm">
													Company Profile.pdf
												</p>
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
												<p className="max-w-40 truncate font-medium text-sm">
													Company Profile.pdf
												</p>
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
												<p className="max-w-40 truncate font-medium text-sm">
													Company Profile.pdf
												</p>
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
							<TabsPanel value="customization">
								<CollapsibleFrame className="space-y-3" title="Color Mode">
									<Fieldset className="gap-4">
										<FieldsetLegend className="font-medium text-sm">Choose a theme</FieldsetLegend>
										<RadioGroup className="flex-row gap-4" defaultValue="system">
											{items.map((item) => (
												<div key={item.value}>
													<FieldLabel className="cursor-pointer flex-col">
														<Radio className="peer sr-only absolute" value={item.value} />
														<span className="relative block h-[90px] w-auto overflow-hidden rounded-lg not-peer-data-checked:opacity-80 shadow-xs transition-shadow peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-64 peer-data-checked:ring-2 peer-data-checked:ring-brand-accent peer-data-checked:ring-offset-1 peer-data-checked:ring-offset-background">
															{themePreviews[item.value]}
														</span>
														<span className="not-peer-data-checked:text-muted-foreground/70">
															{item.label}
														</span>
													</FieldLabel>
												</div>
											))}
										</RadioGroup>
									</Fieldset>
								</CollapsibleFrame>
								<CollapsibleFrame className="space-y-3" title="Layout style">
									<Fieldset className="gap-4">
										<FieldsetLegend className="font-medium text-sm">Choose a theme</FieldsetLegend>
										<RadioGroup className="flex-row gap-4" defaultValue="system">
											{items.map((item) => (
												<div key={item.value}>
													<FieldLabel className="cursor-pointer flex-col">
														<Radio className="peer sr-only absolute" value={item.value} />
														<span className="relative block overflow-hidden rounded-lg not-peer-data-checked:opacity-80 shadow-xs transition-shadow peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-64 peer-data-checked:ring-2 peer-data-checked:ring-brand-accent peer-data-checked:ring-offset-1 peer-data-checked:ring-offset-background">
															<Image
																alt="Default Theme Template"
																height={370}
																loading="lazy"
																src="/templates/default.svg"
																width={180}
															/>
														</span>
														<span className="not-peer-data-checked:text-muted-foreground/70">
															{item.label}
														</span>
													</FieldLabel>
												</div>
											))}
										</RadioGroup>
									</Fieldset>
								</CollapsibleFrame>
							</TabsPanel>
							<TabsPanel value="analytics">
								<Empty>
									<EmptyHeader>
										<EmptyMedia variant="icon">
											<ChartPieSliceIcon weight="fill" />
										</EmptyMedia>
										<EmptyTitle>You don't have any data to track... yet</EmptyTitle>
										<EmptyDescription>
											Publish your page to start tracking how your audience is engaging
										</EmptyDescription>
									</EmptyHeader>
									<EmptyContent>
										<Button>Publish Page</Button>
									</EmptyContent>
								</Empty>
							</TabsPanel>
						</Tabs>
					</FieldGroup>
				</ScrollArea>
				<aside className="sticky top-14 h-[91svh]">
					<div className="m-4 h-full rounded-md border bg-muted">
						<div className="m-1 rounded-md bg-muted p-3">
							<h3 className="text-md text-muted-foreground">Quick Action</h3>
							<div>
								<Button variant="outline">Preview</Button>
							</div>
						</div>

						<CollapsibleFrame
							className="flex h-[50%] items-center justify-center overflow-hidden"
							title="Properties"
						>
							<PhoneMockup>
								<ScrollArea>
									<div className="w-full p-4">
										<p>Hello</p>

										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quo
											optio rerum recusandae rem explicabo corporis sunt qui amet adipisci cum,
											corrupti officiis enim illo iusto eius laudantium modi eveniet? Natus iste
											harum nulla reprehenderit repellat cum itaque hic dolor sint repudiandae
											fuga eius assumenda est, debitis, omnis repellendus saepe, exercitationem
											beatae? Molestias veritatis quis officiis accusamus, itaque at corporis!
											Ipsam saepe ipsa nulla voluptatem iure, non ad consequuntur maxime alias.
											Ipsam doloribus deleniti assumenda, laudantium voluptatibus incidunt!
											Debitis soluta expedita vitae quam ipsa cumque id culpa libero! Explicabo,
											consequatur.
										</p>
									</div>
								</ScrollArea>
							</PhoneMockup>
						</CollapsibleFrame>

						<div className="mt-auto border-t p-3">
							<form.AppForm>
								<form.SubmitButton label="Save" />
							</form.AppForm>
						</div>
					</div>
				</aside>
			</div>
		</form>
	);
};

const themePreviews = {
	dark: (
		<svg aria-hidden className="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
			<path className="fill-neutral-900" d="M0 0h88v70H0z" />
			<path className="fill-neutral-800 shadow-sm" d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z" />
			<circle className="fill-neutral-600" cx="28" cy="26" r="8" />
			<rect className="fill-neutral-700" height="4" rx="2" width="58" x="20" y="42" />
			<rect className="fill-neutral-700" height="4" rx="2" width="58" x="20" y="49" />
			<rect className="fill-neutral-700" height="4" rx="2" width="29" x="20" y="56" />
		</svg>
	),
	light: (
		<svg aria-hidden className="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
			<path className="fill-neutral-200" d="M0 0h88v70H0z" />
			<path className="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z" />
			<circle className="fill-neutral-300" cx="28" cy="26" r="8" />
			<rect className="fill-neutral-200" height="4" rx="2" width="58" x="20" y="42" />
			<rect className="fill-neutral-200" height="4" rx="2" width="58" x="20" y="49" />
			<rect className="fill-neutral-200" height="4" rx="2" width="29" x="20" y="56" />
		</svg>
	),
	system: (
		<svg aria-hidden className="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
			<path className="fill-neutral-200" d="M0 0h44v70H0z" />
			<path className="fill-neutral-900" d="M44 0h44v70H44z" />
			<path className="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h30v62H10V12Z" />
			<circle className="fill-neutral-300" cx="28" cy="26" r="8" />
			<path
				className="fill-neutral-200"
				d="M20 44a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 51a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 58a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2Z"
			/>
			<path className="fill-neutral-800 shadow-sm" d="M54 12a4 4 0 0 1 4-4h30v62H54V12Z" />
			<circle className="fill-neutral-600" cx="72" cy="26" r="8" />
			<path
				className="fill-neutral-700"
				d="M64 44a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 51a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 58a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2Z"
			/>
		</svg>
	),
} as const;
