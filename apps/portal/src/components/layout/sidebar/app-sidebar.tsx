"use client";

import { useRef, useState } from "react";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Link2, QrCode, Star } from "lucide-react";

import { CardPlusIcon } from "@ziron/ui/assets/icons/digital-card";
import { SearchIcon, type SearchIconHandle } from "@ziron/ui/assets/icons/search";
import { Kbd, KbdGroup } from "@ziron/ui/components/kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@ziron/ui/components/sidebar";
import { TabsSubtle, TabsSubtleItem } from "@ziron/ui/components/tabs-subtle";

import { useActiveOrganization } from "@/lib/auth/client";

import { OrganizationSelector } from "./organization-selector";

const mainNav = [
	{ href: "/cards", label: "Cards", icon: CreditCard },
	{ href: "/qr", label: "QR", icon: QrCode },
	{ href: "/links", label: "Links", icon: Link2 },
	{ href: "/reviews", label: "Review", icon: Star },
] as const;

export function AppSidebar() {
	const pathname = usePathname();
	const { data: activeOrganization } = useActiveOrganization();
	const activePath = pathname === "/" ? `/${activeOrganization?.slug}` : pathname;
	const tabs = [
		{ icon: CreditCard, label: "Cards" },
		{ icon: QrCode, label: "Qr" },
		{ icon: Link2, label: "Links" },
		{ icon: Star, label: "Review" },
	];
	const [selected, setSelected] = useState(0);

	const iconRef = useRef<SearchIconHandle>(null);

	return (
		<Sidebar className="bg-transparent" collapsible="icon" variant="sidebar">
			<SidebarHeader>
				<OrganizationSelector />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="p-0">
					<SidebarGroupContent className="px-2">
						<SidebarMenu className="flex flex-row justify-between gap-1 border-sidebar-border border-b pb-2 md:border-0 md:pb-0">
							<div className="flex items-center gap-1">
								<TabsSubtle activeLabel idPrefix="demo" onSelect={setSelected} selectedIndex={selected}>
									{tabs.map((tab, i) => (
										<TabsSubtleItem icon={tab.icon} index={i} key={tab.label} label={tab.label} />
									))}
								</TabsSubtle>
								{mainNav.map(({ href, label, icon: Icon }) => {
									const slug = activeOrganization?.slug;
									const itemPath =
										slug != null && slug !== ""
											? `/${slug}${href}`
											: `/${String(activeOrganization?.slug)}${href}`;
									const isActive = Boolean(slug && activePath === itemPath);
									return (
										<SidebarMenuItem className="min-w-0 flex-1 md:flex-none" key={label}>
											<SidebarMenuButton
												isActive={isActive}
												render={<Link href={itemPath as Route} />}
												tooltip={label}
											>
												<Icon />
												{isActive && <span>{label}</span>}
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</div>

							<SidebarMenuItem>
								<SidebarMenuButton
									onMouseEnter={() => iconRef.current?.startAnimation()}
									onMouseLeave={() => iconRef.current?.stopAnimation()}
								>
									<SearchIcon className="size-4" ref={iconRef} />
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="justify-between bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							render={<Link href={`/${activeOrganization?.slug}/cards/new` as Route} />}
							size="lg"
							tooltip={{ children: "Create card" }}
						>
							<span className="flex items-center gap-1">
								<CardPlusIcon className="size-5" />
								New card
							</span>
							<KbdGroup>
								<Kbd>Ctrl</Kbd>
								<Kbd>O</Kbd>
							</KbdGroup>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<div className="absolute bottom-0 left-12 -z-10 size-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-accent/10 blur-3xl" />
		</Sidebar>
	);
}
