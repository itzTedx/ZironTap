import { useId } from "react";

import type { UploadHookControl } from "@better-upload/client";
import type { Icon } from "@phosphor-icons/react";
import { SpinnerIcon, UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";

type UploadButtonProps = {
	control: UploadHookControl<false>;
	id?: string;
	accept?: string;
	metadata?: Record<string, unknown>;
	uploadOverride?: (...args: Parameters<UploadHookControl<false>["upload"]>) => void;
	icon?: Icon;
	// Add any additional props you need.
};

export function UploadButton({
	control: { upload, isPending },
	id: _id,
	accept,
	metadata,
	uploadOverride,
	icon = UploadSimpleIcon,
}: UploadButtonProps) {
	const id = useId();
	const Icon = icon;
	return (
		<Button className="relative" disabled={isPending} type="button" variant="outline">
			<label className="absolute inset-0 cursor-pointer" htmlFor={_id || id}>
				<input
					accept={accept}
					className="absolute inset-0 size-0 opacity-0"
					disabled={isPending}
					id={_id || id}
					onChange={(e) => {
						if (e.target.files?.[0] && !isPending) {
							if (uploadOverride) {
								uploadOverride(e.target.files[0], { metadata });
							} else {
								upload(e.target.files[0], { metadata });
							}
						}
						e.target.value = "";
					}}
					type="file"
				/>
			</label>
			{isPending ? (
				<>
					<SpinnerIcon className="animate-spin" weight="bold" />
					Upload file
				</>
			) : (
				<>
					<Icon weight="bold" />
					Upload file
				</>
			)}
		</Button>
	);
}
