"use client";

import { useUploadFile } from "@better-upload/client";
import { LinkIcon, TrashIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";

import { UnsplashIcon } from "@ziron/ui/assets/icons/unsplash";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@ziron/ui/components/frame";
import { Input } from "@ziron/ui/components/input";

import { DialogDrawer } from "@/components/responsive/dialog-drawer";
import { UploadButton } from "@/components/upload/upload-button";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

import { CoverUpload } from "./fields/cover-upload";

export const CardForm = () => {
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
				<FieldGroup className="container mt-4 max-w-4xl">
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

					<FieldGroup>
						<form.Field
							children={() => {
								return (
									<div className="flex items-center gap-4">
										<div className="rounded-full border border-dashed p-2">
											<div className="size-20 rounded-full bg-muted" />
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
					</FieldGroup>
				</FieldGroup>
				<aside>Context menu</aside>
			</div>
		</form>
	);
};
