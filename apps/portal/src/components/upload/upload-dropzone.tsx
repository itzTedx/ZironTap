import { useId, useRef } from "react";

import type { UploadHookControl } from "@better-upload/client";
import { Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { CloudUploadIcon, type CloudUploadIconHandle } from "@ziron/ui/assets/icons/upload";
import { cn } from "@ziron/ui/lib/utils";

type UploadDropzoneProps = {
	control: UploadHookControl<true>;
	id?: string;
	accept?: string;
	metadata?: Record<string, unknown>;
	description?:
		| {
				fileTypes?: string;
				maxFileSize?: string;
				maxFiles?: number;
		  }
		| string;
	helperText?: string;
	uploadOverride?: (...args: Parameters<UploadHookControl<true>["upload"]>) => void;

	// Add any additional props you need.
};

export function UploadDropzone({
	control: { upload, isPending },
	id: _id,
	accept,
	metadata,
	description,
	helperText,
	uploadOverride,
}: UploadDropzoneProps) {
	const id = useId();
	const iconRef = useRef<CloudUploadIconHandle>(null);

	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
		onDrop: (files) => {
			if (files.length > 0 && !isPending) {
				if (uploadOverride) {
					uploadOverride(files, { metadata });
				} else {
					upload(files, { metadata });
				}
			}
			inputRef.current.value = "";
		},
		noClick: true,
	});

	return (
		<div
			className={cn("relative rounded-lg border border-input border-dashed text-foreground transition-colors", {
				"border-primary/80": isDragActive,
			})}
			onMouseEnter={() => iconRef.current?.startAnimation()}
			onMouseLeave={() => iconRef.current?.stopAnimation()}
		>
			<label
				{...getRootProps()}
				className={cn(
					"flex w-full min-w-72 cursor-pointer flex-col items-center justify-center rounded-lg bg-transparent px-2 py-6 transition-colors dark:bg-input/10",
					{
						"cursor-not-allowed text-muted-foreground": isPending,
						"hover:bg-accent dark:hover:bg-accent/40": !isPending,
						"opacity-0": isDragActive,
					}
				)}
				htmlFor={_id || id}
			>
				<div className="my-2">
					{isPending ? (
						<Loader2 className="size-6 animate-spin" />
					) : (
						<CloudUploadIcon className="size-6 text-foreground/60" ref={iconRef} />
					)}
				</div>

				<div className="mt-3 space-y-1 text-center">
					<p className="font-semibold text-sm">Drag and drop files here</p>

					<p className="max-w-64 text-muted-foreground text-xs">
						{typeof description === "string" ? (
							description
						) : (
							<>
								{description?.maxFiles &&
									`You can upload ${description.maxFiles} file${description.maxFiles !== 1 ? "s" : ""}.`}{" "}
								{description?.maxFileSize &&
									`${description.maxFiles !== 1 ? "Each u" : "U"}p to ${description.maxFileSize}.`}{" "}
								{description?.fileTypes && `Accepted ${description.fileTypes}.`}
							</>
						)}
					</p>

					{helperText && <p className="mt-3 text-muted-foreground text-xs">{helperText}</p>}
				</div>

				<input {...getInputProps()} accept={accept} disabled={isPending} id={_id || id} multiple type="file" />
			</label>

			{isDragActive && (
				<div className="pointer-events-none absolute inset-0 rounded-lg">
					<div className="flex size-full flex-col items-center justify-center rounded-lg bg-accent dark:bg-accent/40">
						<div className="my-2">
							<CloudUploadIcon className="size-6" ref={iconRef} />
						</div>

						<p className="mt-3 font-semibold text-sm">Drop files here</p>
					</div>
				</div>
			)}
		</div>
	);
}
