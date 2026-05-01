"use client";

import Image from "next/image";

import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";

import {
	Menu,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuSeparator,
	MenuShortcut,
	MenuTrigger,
} from "@ziron/ui/components/menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from "@ziron/ui/components/sidebar";

import { useActiveOrganization, useListOrganizations, useSession } from "@/lib/auth/client";

export const OrganizationSelector = () => {
	const { data, error, isPending } = useActiveOrganization();
	const { data: organizations } = useListOrganizations();
	const org = useListOrganizations();
	const { isMobile } = useSidebar();

	const user = useSession();
	console.log("org: ", org);
	console.log("user: ", user);

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
								<SidebarMenuButton
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									size="lg"
								/>
							}
						>
							<div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{data.logo && <Image alt={data.name} className="object-contain" fill src={data.logo} />}
							</div>
							<div className="grid text-left text-sm leading-tight">
								<span className="truncate font-medium">{data.name}'s ZironTap</span>
							</div>
							<CaretDownIcon />
						</MenuTrigger>
						<SidebarTrigger />
					</div>
					<MenuPopup
						align="start"
						className="min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<MenuGroup>
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
									<MenuShortcut>⌘{index + 1}</MenuShortcut>
								</MenuItem>
							))}
							<MenuSeparator />
							<MenuItem className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<PlusIcon className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">New organization</div>
							</MenuItem>
						</MenuGroup>
					</MenuPopup>
				</Menu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
