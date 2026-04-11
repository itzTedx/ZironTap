"use client";

import { useQuery } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@ziron/ui/components/empty";
import { Separator } from "@ziron/ui/components/separator";

import { orpc } from "@/lib/orpc/client";

import { MediaLibraryHeader } from "../components/media-library-header";
import { MediaUploadButton } from "../components/media-uploader";

export const MediaLibraryView = () => {
	const { data: items } = useQuery(orpc.media.list.queryOptions());
	return (
		<div className="flex h-full flex-col">
			<MediaLibraryHeader />
			<Separator />
			<div className="grow overflow-hidden">
				{items?.length === 0 ? (
					<Empty className="flex h-full w-full items-center justify-center">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<InfoIcon />
							</EmptyMedia>
							<EmptyTitle>No media yet</EmptyTitle>
							<EmptyDescription>Start by uploading your files.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<MediaUploadButton />
						</EmptyContent>
					</Empty>
				) : null}
			</div>
		</div>
	);
};
