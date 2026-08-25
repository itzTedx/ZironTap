"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@ziron/ui/components/avatar";
import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link";
import type { Organization } from "better-auth/plugins"
import { MoreHorizontal } from "lucide-react";

import { IconDipArrowRight } from "@ziron/ui/assets/icons/arrow";

import { Button } from "@ziron/ui/components/button";
import { type DataTableFeatures } from "./features"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuLinkItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@ziron/ui/components/menu";

const columnHelper = createColumnHelper<DataTableFeatures, Organization>()

export const columns = columnHelper.columns([
	columnHelper.accessor("name", {
		header: "Name",
		size: 200,
		cell: ({ row }) => {
			const metadata = JSON.parse(row.original.metadata);
			return (
				<div className="flex items-center gap-4">
					<Avatar className="size-16 rounded-sm bg-white">
						<AvatarImage className="object-contain" src={row.original.logo!} />
						<AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
					</Avatar>

					{metadata.website && (
						<div>
							<div className="font-semibold text-base">{row.original.name}</div>

							<div className="mt-1 flex items-center gap-1 text-muted-foreground hover:underline">
								<IconDipArrowRight className="size-3" />
								<Link href={metadata.website}>{metadata.website}</Link>
							</div>
						</div>
					)}
				</div>
			);
		},
	}),
	columnHelper.accessor("id", {
		header: "ID",
		size: 220,
	}),
	columnHelper.accessor("metadata.cardsCount", {
		header: "Cards",
		maxSize: 60,
		cell: ({ row }) => {
			const metadata = JSON.parse(row.original.metadata);

			return <p>{metadata.cardsCount}</p>;
		},
	}),
	columnHelper.accessor("createdAt", {
		header: "Created",
		cell: ({ row }) => {
			const createdAt = row.original.createdAt;
			const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
			return (
				<div className="tabular-nums">
					{date.toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</div>
			);
		},
	}),
	columnHelper.display({
		id: "actions",
		size: 30,
		cell: ({ row }) => {
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant="ghost" className="h-8 w-8 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(payment.id)}
							>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLinkItem render={<Link href={`/organizations/${row.original.slug}`} />}>Edit Organization</DropdownMenuLinkItem>
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	}),
])