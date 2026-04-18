"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Link2, QrCode, Star } from "lucide-react";

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
	{ href: "/", label: "QR", icon: QrCode },
	{ href: "/", label: "Links", icon: Link2 },
	{ href: "/", label: "Review", icon: Star },
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
						<SidebarMenu className="f flex flex-row gap-1 border-sidebar-border border-b pb-2 md:border-0 md:pb-0">
							{mainNav.map(({ href, label, icon: Icon }) => {
								const slug = activeOrganization?.slug;
								const itemPath =
									slug != null && slug !== ""
										? href === "/"
											? `/${slug}`
											: `/${slug}${href}`
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
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
