"use client";

import { useRef } from "react";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Link2, QrCode, Star } from "lucide-react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";

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

import { useActiveOrganization } from "@/lib/auth/client";

import { OrganizationSelector } from "./organization-selector";

const NAV_TABS = [
	{ href: "/cards", label: "Cards", icon: CreditCard },
	{ href: "/qr", label: "QR", icon: QrCode },
	{ href: "/links", label: "Links", icon: Link2 },
	{ href: "/reviews", label: "Review", icon: Star },
] as const;

export function AppSidebar() {
	const pathname = usePathname();
	const { data: activeOrganization } = useActiveOrganization();
	const activePath = pathname === "/" ? `/${activeOrganization?.slug}` : pathname;

	const iconRef = useRef<SearchIconHandle>(null);

	return (
		<LazyMotion features={domAnimation}>
			<Sidebar className="bg-transparent" collapsible="icon" variant="sidebar">
				<SidebarHeader>
					<OrganizationSelector />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="p-0">
						<SidebarGroupContent className="flex flex-row justify-between gap-1 border-b px-2 pb-2 md:border-0 md:pb-0">
							<SidebarMenu className="flex-1 shrink-0 flex-row items-center">
								{NAV_TABS.map(({ href, label, icon: Icon }) => {
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
												<AnimatePresence initial={false}>
													{isActive ? (
														<m.span
															animate={{ maxWidth: 96, opacity: 1, x: 0 }}
															className="inline-block overflow-hidden whitespace-nowrap"
															exit={{ maxWidth: 0, opacity: 0, x: -4 }}
															initial={{ maxWidth: 0, opacity: 0, x: -4 }}
															key={label}
															transition={{ duration: 0.2, ease: "easeOut" }}
														>
															{label}
														</m.span>
													) : null}
												</AnimatePresence>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>

							<div>
								<SidebarMenuButton
									onMouseEnter={() => iconRef.current?.startAnimation()}
									onMouseLeave={() => iconRef.current?.stopAnimation()}
								>
									<SearchIcon className="size-4" ref={iconRef} />
								</SidebarMenuButton>
							</div>
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
		</LazyMotion>
	);
}
