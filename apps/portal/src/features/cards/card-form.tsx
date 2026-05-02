"use client";

import { useState } from "react";

import Image from "next/image";

import { useUploadFile } from "@better-upload/client";
import { LinkIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { ChevronDownIcon, Mail } from "lucide-react";

import { UnsplashIcon } from "@ziron/ui/assets/icons/unsplash";
import { Button } from "@ziron/ui/components/button";
import { Card } from "@ziron/ui/components/card";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ziron/ui/components/collapsible";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@ziron/ui/components/frame";
import { Input } from "@ziron/ui/components/input";
import { Map, MapControls } from "@ziron/ui/components/map";
import { PopoverForm, PopoverFormButton, PopoverFormSuccess } from "@ziron/ui/components/popover-form";
import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ziron/ui/components/tabs";
import { Textarea } from "@ziron/ui/components/textarea";

import { DialogDrawer } from "@/components/responsive/dialog-drawer";
import { UploadButton } from "@/components/upload/upload-button";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

import { CoverUpload } from "./fields/cover-upload";

export const CardForm = () => {
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {
			name: "",
			slug: "",
			coverImage: "",
			photo: "",
			email: "",
			phone: "",
			bio: "",
			organizationId: "",
			jobTitle: "",
			address: "",
			mapUrl: "",
		},
	});

	const { control } = useUploadFile({
		route: UPLOAD_ROUTES.photo,
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
						<form.Field
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Frame>
										<FrameHeader className="flex flex-row items-center justify-between">
											<FrameTitle>Cover Image</FrameTitle>
											<div className="flex items-center gap-2">
												<Button size="sm" variant="destructive-outline">
													<TrashIcon /> Remove
												</Button>
												<DialogDrawer
													buttonProps={{ size: "icon-sm", variant: "outline" }}
													title="Edit cover image"
													trigger={<LinkIcon />}
												>
													<Field data-invalid={isInvalid}>
														<FieldLabel htmlFor={field.name}>Cover Image URL</FieldLabel>
														<Input
															aria-invalid={isInvalid}
															autoComplete="off"
															id={field.name}
															name={field.name}
															onBlur={field.handleBlur}
															onChange={(e) => field.handleChange(e.target.value)}
															placeholder="https://example.com/image.jpg"
															value={field.state.value}
														/>
														{isInvalid && <FieldError errors={field.state.meta.errors} />}
													</Field>
												</DialogDrawer>
												<DialogDrawer
													buttonProps={{ size: "icon-sm", variant: "outline" }}
													title="Edit cover image"
													trigger={<UnsplashIcon />}
												>
													<div>Form fields</div>
												</DialogDrawer>
											</div>
										</FrameHeader>
										<FramePanel className="p-1">
											<CoverUpload />
										</FramePanel>
									</Frame>
								);
							}}
							name="coverImage"
						/>

						<FieldGroup className="flex-row justify-between">
							<form.Field
								children={() => {
									return (
										<div className="flex items-center gap-4">
											<div className="relative rounded-full border border-dashed p-3">
												<div className="absolute top-3 right-3 grid size-6 place-content-center rounded-full border-2 border-background bg-muted-foreground">
													<PlusIcon className="size-3" />
												</div>
												<div className="relative size-20 overflow-hidden rounded-full bg-muted">
													<Image
														alt="Placeholder profile image"
														className="object-cover object-top"
														fill
														src="/svg/placeholder-profile.svg"
													/>
												</div>
											</div>
											<div className="space-y-1">
												<UploadButton control={control} />
												<FieldDescription>Recommended size: 1:1, up to 2mb</FieldDescription>
											</div>
										</div>
									);
								}}
								name="photo"
							/>
							<form.Field
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<PopoverForm
											open={open}
											openChild={
												<div
													className="p-4"
													onSubmit={(e) => {
														e.preventDefault();
													}}
												>
													<div className="mb-4 space-y-2">
														<label
															className="mb-1 block font-medium text-muted-foreground text-sm"
															htmlFor={field.name}
														>
															Link
														</label>
														<div className="relative">
															<input
																className="w-full rounded-md border px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
																disabled={isInvalid}
																id={field.name}
																name={field.name}
																onBlur={field.handleBlur}
																onChange={(e) => field.handleChange(e.target.value)}
																placeholder="you@example.com"
																required
																type="text"
																value={field.state.value}
															/>
															<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
																<Mail className="size-4 text-muted-foreground" />
															</div>
														</div>
														<p className="text-muted-foreground text-xs tracking-tight">
															Sick content to your mailbox every week!
														</p>
													</div>
													<PopoverFormButton loading={form.state.isSubmitting} text="Check" />
												</div>
											}
											setOpen={setOpen}
											showCloseButton={form.state.isBlurred}
											showSuccess={form.state.isSubmitSuccessful}
											successChild={
												<PopoverFormSuccess
													description="Thank you for joining our newsletter."
													title="Successfully subscribed!"
												/>
											}
											title="zirontap.to/"
											width="320px"
										/>
									);
								}}
								name="slug"
							/>
						</FieldGroup>
						<Tabs defaultValue="general">
							<TabsList className="w-full">
								<TabsTab value="general">General</TabsTab>
								<TabsTab value="links">Links</TabsTab>
								<TabsTab value="customization">Customization</TabsTab>
							</TabsList>
							<TabsPanel className="space-y-3" value="general">
								<Frame className="w-full">
									<Collapsible defaultOpen>
										<FrameHeader className="px-2 py-2">
											<CollapsibleTrigger className="flex items-center justify-between data-panel-open:[&_div_>_svg]:rotate-180">
												Basic Information
												<div className="grid size-6 place-content-center rounded-sm bg-muted">
													<ChevronDownIcon className="size-4" />
												</div>
											</CollapsibleTrigger>
										</FrameHeader>
										<CollapsiblePanel>
											<FramePanel>
												<FieldGroup>
													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>Name</FieldLabel>
																	<Input
																		aria-invalid={isInvalid}
																		autoComplete="name"
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="e.g. John Doe"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="name"
													/>

													<FieldGroup className="flex-row gap-3">
														<form.Field
															children={(field) => {
																const isInvalid =
																	field.state.meta.isTouched &&
																	!field.state.meta.isValid;
																return (
																	<Field data-invalid={isInvalid}>
																		<FieldLabel htmlFor={field.name}>
																			Email
																		</FieldLabel>
																		<Input
																			aria-invalid={isInvalid}
																			autoComplete="email"
																			id={field.name}
																			name={field.name}
																			onBlur={field.handleBlur}
																			onChange={(e) =>
																				field.handleChange(e.target.value)
																			}
																			placeholder="e.g. name@company.com"
																			value={field.state.value}
																		/>

																		{isInvalid && (
																			<FieldError
																				errors={field.state.meta.errors}
																			/>
																		)}
																	</Field>
																);
															}}
															name="email"
														/>
														<form.Field
															children={(field) => {
																const isInvalid =
																	field.state.meta.isTouched &&
																	!field.state.meta.isValid;
																return (
																	<Field data-invalid={isInvalid}>
																		<FieldLabel htmlFor={field.name}>
																			Phone
																		</FieldLabel>
																		<Input
																			aria-invalid={isInvalid}
																			autoComplete="tel"
																			id={field.name}
																			name={field.name}
																			onBlur={field.handleBlur}
																			onChange={(e) =>
																				field.handleChange(e.target.value)
																			}
																			placeholder="e.g. +00 000 000 0000"
																			value={field.state.value}
																		/>

																		{isInvalid && (
																			<FieldError
																				errors={field.state.meta.errors}
																			/>
																		)}
																	</Field>
																);
															}}
															name="phone"
														/>
													</FieldGroup>

													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>Bio</FieldLabel>
																	<Textarea
																		aria-invalid={isInvalid}
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="Write a short bio about yourself or your role…"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="bio"
													/>
												</FieldGroup>
											</FramePanel>
										</CollapsiblePanel>
									</Collapsible>
								</Frame>
								<Frame className="w-full">
									<Collapsible defaultOpen>
										<FrameHeader className="px-2 py-2">
											<CollapsibleTrigger className="flex items-center justify-between data-panel-open:[&_div_>_svg]:rotate-180">
												Organization
												<div className="grid size-6 place-content-center rounded-sm bg-muted">
													<ChevronDownIcon className="size-4" />
												</div>
											</CollapsibleTrigger>
										</FrameHeader>
										<CollapsiblePanel>
											<FramePanel>
												<FieldGroup>
													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>
																		Company
																	</FieldLabel>
																	<Input
																		aria-invalid={isInvalid}
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="Zirontap"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="organizationId"
													/>
													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>
																		Job Title
																	</FieldLabel>
																	<Input
																		aria-invalid={isInvalid}
																		autoComplete="name"
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="e.g. Product Manager"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="jobTitle"
													/>
												</FieldGroup>
											</FramePanel>
										</CollapsiblePanel>
									</Collapsible>
								</Frame>
								<Frame className="w-full">
									<Collapsible defaultOpen>
										<FrameHeader className="px-2 py-2">
											<CollapsibleTrigger className="flex items-center justify-between data-panel-open:[&_div_>_svg]:rotate-180">
												Location
												<div className="grid size-6 place-content-center rounded-sm bg-muted">
													<ChevronDownIcon className="size-4" />
												</div>
											</CollapsibleTrigger>
										</FrameHeader>
										<CollapsiblePanel>
											<FramePanel>
												<FieldGroup>
													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>
																		Address
																	</FieldLabel>
																	<Input
																		aria-invalid={isInvalid}
																		autoComplete="address-line1"
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="e.g. Khalifa Street, Abu Dhabi, UAE"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="address"
													/>
													<form.Field
														children={(field) => {
															const isInvalid =
																field.state.meta.isTouched && !field.state.meta.isValid;
															return (
																<Field data-invalid={isInvalid}>
																	<FieldLabel htmlFor={field.name}>
																		Map Url
																	</FieldLabel>
																	<Input
																		aria-invalid={isInvalid}
																		id={field.name}
																		name={field.name}
																		onBlur={field.handleBlur}
																		onChange={(e) =>
																			field.handleChange(e.target.value)
																		}
																		placeholder="Paste a Google Maps link"
																		value={field.state.value}
																	/>

																	{isInvalid && (
																		<FieldError errors={field.state.meta.errors} />
																	)}
																</Field>
															);
														}}
														name="mapUrl"
													/>
													<Card className="h-[240px] overflow-hidden p-0">
														<Map center={[-74.006, 40.7128]} zoom={11}>
															<MapControls />
														</Map>
													</Card>
												</FieldGroup>
											</FramePanel>
										</CollapsiblePanel>
									</Collapsible>
								</Frame>
							</TabsPanel>
							<TabsPanel value="links">Tab 2 content</TabsPanel>
							<TabsPanel value="customization">Tab 3 content</TabsPanel>
						</Tabs>
					</FieldGroup>
				</ScrollArea>
				<aside className="sticky top-14 h-[91svh]">
					<div className="m-4 h-full rounded-md border bg-muted p-1">
						<div className="rounded-md bg-muted p-3">
							<h3 className="text-md text-muted-foreground">Quick Action</h3>
							<div>
								<Button variant="outline">Preview</Button>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</form>
	);
};
