"use client";

import { LinkIcon, TrashIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";

import { UnsplashIcon } from "@ziron/ui/assets/icons/unsplash";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@ziron/ui/components/frame";
import { Input } from "@ziron/ui/components/input";

import { DialogDrawer } from "@/components/responsive/dialog-drawer";

import { CoverUpload } from "./fields/cover-upload";

export const CardForm = () => {
	const form = useForm({
		defaultValues: {
			name: "",
			slug: "",
			coverImage: "",
			email: "",
			phone: "",
			bio: "",
			organizationId: "",
			jobTitle: "",
			address: "",
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
				<div className="container mt-4 max-w-4xl">
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
				</div>
				<aside>Context menu</aside>
			</div>
		</form>
	);
};
