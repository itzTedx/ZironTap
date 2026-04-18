"use client";

import Image from "next/image";

import { useActiveOrganization } from "@/lib/auth/client";

export function CurrentOrganization() {
	const { data, error, isPending } = useActiveOrganization();

	if (isPending) {
		return <p className="text-muted-foreground text-sm">Loading organization…</p>;
	}

	if (error || !data) {
		return (
			<div className="rounded-lg border border-dashed p-4 text-sm">
				<p className="font-medium">No active organization</p>
				<p className="mt-1 text-muted-foreground">
					Create an organization or set one as active to see it here.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-sm shadow-sm">
			<h2 className="font-medium text-base">Current organization</h2>
			<div className="flex items-start gap-3">
				{data.logo ? (
					<Image
						alt=""
						className="size-12 shrink-0 rounded-md border object-cover"
						height={48}
						src={data.logo}
						unoptimized
						width={48}
					/>
				) : null}
				<div className="min-w-0 flex-1">
					<p className="truncate font-medium">{data.name}</p>
					<p className="font-mono text-muted-foreground text-xs">{data.slug}</p>
					{Array.isArray(data.members) ? (
						<p className="mt-2 text-muted-foreground text-xs">
							{data.members.length} member{data.members.length === 1 ? "" : "s"}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
}
