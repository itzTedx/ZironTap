"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Link2, QrCode, SearchIcon, Star } from "lucide-react";

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

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<OrganizationSelector />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="p-0">
					<SidebarGroupContent className="px-2">
						<SidebarMenu className="flex flex-row justify-between gap-1 border-sidebar-border border-b pb-2 md:border-0 md:pb-0">
							<div className="flex items-center gap-1">
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
								<SidebarMenuButton>
									<SearchIcon />
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
							className="justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							render={<Link href={`/${activeOrganization?.slug}/cards/new` as Route} />}
							size="lg"
							tooltip={{ children: "Create card" }}
						>
							New card
							<KbdGroup>
								<Kbd>Ctrl</Kbd>
								<Kbd>O</Kbd>
							</KbdGroup>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
