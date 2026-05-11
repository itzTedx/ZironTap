"use client";

import { useState } from "react";

import Image from "next/image";

import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import { GearIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import {
	Menu,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuShortcut,
	MenuTrigger,
} from "@ziron/ui/components/menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@ziron/ui/components/sidebar";

import { OrganizationModal } from "@/features/organization/components/organization-modal";
import { useActiveOrganization, useListOrganizations } from "@/lib/auth/client";

export const OrganizationSelector = () => {
	const [open, setOpen] = useState(false);
	const { data, error, isPending } = useActiveOrganization();
	const { data: organizations } = useListOrganizations();

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
		<SidebarMenu>
			<SidebarMenuItem>
				<Menu>
					<div className="flex items-center justify-between gap-2">
						<MenuTrigger
							render={
								<SidebarMenuButton className="w-fit data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" />
							}
						>
							<div className="relative flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{data.logo && <Image alt={data.name} className="object-cover" fill src={data.logo} />}
							</div>
							<div className="grid text-left text-sm leading-tight">
								<span className="truncate font-medium">{data.name}</span>
							</div>
							<CaretDownIcon size={16} />
						</MenuTrigger>
						<SidebarTrigger />
					</div>
					<MenuPopup align="start" className="min-w-72 rounded-lg" side="bottom" sideOffset={4}>
						<div className="border-b px-3 py-2">
							<div className="flex items-center gap-3">
								<div className="grid size-12 place-content-center rounded-sm bg-muted">
									{data.logo ? (
										<Image alt={data.name} height={32} src={data.logo} width={32} />
									) : (
										data.name
									)}
								</div>
								<div>
									<span className="font-medium">{data.name}</span>
									<div className="flex items-center gap-2 text-muted-foreground text-xs">
										<p>Owner</p> <span>•</span> <p>Business Plan</p>
									</div>
								</div>
							</div>
							<div className="mt-2 flex items-center gap-2">
								<Button size="sm" variant="outline">
									<GearIcon /> Settings
								</Button>
								<Button size="sm" variant="outline">
									<GearIcon /> Invite Member
								</Button>
							</div>
						</div>

						<MenuGroup className="px-0">
							<div className="px-1 pb-1">
								<MenuGroupLabel className="text-muted-foreground text-xs">Organizations</MenuGroupLabel>
								{organizations?.map((organization, index) => (
									<MenuItem className="gap-2 p-2" key={organization.name}>
										<div className="flex size-6 items-center justify-center rounded-md border">
											{organization.logo && (
												<Image
													alt={organization.name}
													height={32}
													src={organization.logo}
													width={32}
												/>
											)}
										</div>
										{organization.name}
										<MenuShortcut className="rounded-sm bg-muted px-1 py-0.5">
											⌘{index + 1}
										</MenuShortcut>
									</MenuItem>
								))}
							</div>

							<MenuItem
								className="justify-center rounded-t-none bg-muted p-2.5"
								onClick={() => setOpen(true)}
							>
								<div className="flex size-6 items-center justify-center rounded-full border border-accent border-dashed bg-transparent">
									<PlusIcon className="size-3.5" />
								</div>
								<div className="font-medium text-accent-foreground">New organization</div>
							</MenuItem>
						</MenuGroup>
					</MenuPopup>
				</Menu>
			</SidebarMenuItem>
			<OrganizationModal className="w-full" open={open} setOpen={setOpen} size="lg" />
		</SidebarMenu>
	);
};
