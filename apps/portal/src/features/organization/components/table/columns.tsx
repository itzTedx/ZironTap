"use client";

import Link from "next/link";

import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import type { ColumnDef } from "@tanstack/react-table";
import type { Organization } from "better-auth/client";

import { IconDipArrowRight } from "@ziron/ui/assets/icons/arrow";
import { Avatar, AvatarFallback, AvatarImage } from "@ziron/ui/components/avatar";
import { Button } from "@ziron/ui/components/button";
import { Checkbox } from "@ziron/ui/components/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ziron/ui/components/dropdown-menu";

export const columns: ColumnDef<Organization>[] = [
	{
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
			/>
		),
		enableSorting: false,
		header: ({ table }) => {
			const isAllSelected = table.getIsAllPageRowsSelected();
			const isSomeSelected = table.getIsSomePageRowsSelected();
			return (
				<Checkbox
					aria-label="Select all rows"
					checked={isAllSelected}
					indeterminate={isSomeSelected && !isAllSelected}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			);
		},
		id: "select",
		size: 20,
	},
	{
		accessorKey: "name",
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
		header: "Name",
		size: 220,
	},

	{
		accessorKey: "id",
		header: "ID",
		size: 220,
	},
	{
		accessorKey: "cards",
		header: "Cards",
		cell: ({ row }) => {
			const metadata = JSON.parse(row.original.metadata);

			return <p>{metadata.cardsCount}</p>;
		},
	},
	{
		accessorKey: "createdAt",
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
		header: "Created",
		size: 140,
	},
	{
		accessorKey: "actions",
		enableSorting: false,
		enableHiding: false,
		cell: ({ row }) => {
			const organization = row.original;

			return (
				<div className="flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger
							render={() => (
								<Button
									className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
									size="icon"
									variant="ghost"
								>
									<DotsThreeIcon className="size-4" />
									<span className="sr-only">Open actions</span>
								</Button>
							)}
						/>

						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Link href={`/organizations/${organization.id}`}>View</Link>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Link href={`/organizations/${organization.id}/edit`}>Edit</Link>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
