import { useUploadFile } from "@better-upload/client";
import { UserFocusIcon } from "@phosphor-icons/react/dist/ssr";
import { useStore } from "@tanstack/react-form-nextjs";

import { Field, FieldDescription, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { cn } from "@ziron/ui/lib/utils";

import { UploadButton } from "@/components/upload/upload-button";

import { ProfileImage } from "@/features/cards/components/profile-image";
import { UPLOAD_ROUTES } from "@/lib/constants/upload";

import { useFieldContext } from "../hooks/use-app-form";

interface ProfileUploadFieldProps {
	label:
		| string
		| {
				text: string;
				srOnly?: boolean;
		  };
	description?: string;
}

export const ProfileUploadField = ({ label, description }: ProfileUploadFieldProps) => {
	const field = useFieldContext<string>();

	const isSrOnly = typeof label === "object" && label.srOnly;
	const labelText = typeof label === "object" ? label.text : label;

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const { control } = useUploadFile({
		route: UPLOAD_ROUTES.photo,
	});

	return (
		<Field className="flex-1" data-invalid={isInvalid} orientation="horizontal">
			<ProfileImage />
			<div className="flex flex-col items-start gap-2">
				<FieldLabel className={cn(isSrOnly ? "sr-only" : null)} htmlFor={field.name}>
					{labelText}
				</FieldLabel>

				<UploadButton control={control} icon={UserFocusIcon} />

				{isInvalid ? (
					<FieldError errors={errors} />
				) : description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
			</div>
		</Field>
	);
};
