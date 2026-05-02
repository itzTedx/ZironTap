import Image from "next/image";

import { PlusIcon } from "lucide-react";

interface ProfileImageProps {
	image?: string | null;
}

export const ProfileImage = ({ image }: ProfileImageProps) => {
	return (
		<div className="relative rounded-full border border-dashed p-3">
			{!image && (
				<div className="absolute top-3 right-3 grid size-6 place-content-center rounded-full border-2 border-background bg-muted-foreground">
					<PlusIcon className="size-3" />
				</div>
			)}
			<div className="relative size-20 overflow-hidden rounded-full bg-muted">
				<Image
					alt="Placeholder profile image"
					className="object-cover object-top"
					fill
					src={image ? image : "/svg/placeholder-profile.svg"}
				/>
			</div>
		</div>
	);
};
