import { useUploadFiles } from "@better-upload/client";
import { LinkIcon, TrashIcon } from "@phosphor-icons/react/ssr";
import { useStore } from "@tanstack/react-form-nextjs";

import { UnsplashIcon } from "@ziron/ui/assets/icons/unsplash";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@ziron/ui/components/frame";
import { Input } from "@ziron/ui/components/input";

import { DialogDrawer } from "@/components/responsive/dialog-drawer";
import { UploadDropzone } from "@/components/upload/upload-dropzone";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

import { useFieldContext } from "../hooks/use-app-form";

interface CoverUploadFieldProps {
	label: string;
	description?: string;
	helperText?: string;
}

export const CoverUploadField = ({ label, description, helperText }: CoverUploadFieldProps) => {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const { control } = useUploadFiles({
		route: UPLOAD_ROUTES.cover,
	});

	return (
		<Frame>
			<FrameHeader className="flex flex-row items-center justify-between">
				<FrameTitle>{label}</FrameTitle>
				<div className="flex items-center gap-2">
					<Button size="sm" variant="destructive-outline">
						<TrashIcon weight="fill" /> Remove
					</Button>
					<DialogDrawer
						buttonProps={{ size: "icon-sm", variant: "outline" }}
						title="Edit cover image"
						trigger={<LinkIcon weight="bold" />}
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
							{isInvalid && <FieldError errors={errors} />}
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
				<UploadDropzone control={control} description={description} helperText={helperText} />
			</FramePanel>

			{isInvalid && <FieldError errors={errors} />}
		</Frame>
	);
};
