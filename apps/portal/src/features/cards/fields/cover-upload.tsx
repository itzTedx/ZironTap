import { useUploadFiles } from "@better-upload/client";

import { UploadDropzone } from "@/components/upload/upload-dropzone";

import { UPLOAD_ROUTES } from "@/lib/constants/upload";

export const CoverUpload = () => {
	const { control } = useUploadFiles({
		route: UPLOAD_ROUTES.cover,
	});

	return (
		<UploadDropzone
			control={control}
			description={"or, click to browse (4MB max)"}
			helperText={"Recommended size: 1200 x 630"}
		/>
	);
};
