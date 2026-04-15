"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { Bell, LineChart, Settings, ShieldCheck } from "lucide-react";

import { IconBlankCard, IconDigitalCard } from "@ziron/ui/assets/icons/digital-card";

import { SidebarNav } from "./sidebar-nav";
import type { SidebarNavAreas, SidebarNavData, SidebarNavGroups } from "./types";

const NAV_GROUPS: SidebarNavGroups<SidebarNavData> = [
	{
		name: "Digital Card",
		description: "Create, organize, and measure the performance of your digital cards.",
		icon: IconDigitalCard,
		href: "/cards",
		active: true,
		// active: pathname.startsWith("/cards"),
	},
];

const NAV_AREAS: SidebarNavAreas<SidebarNavData> = {
	// Top-level
	default: () => ({
		title: "Digital Cards",
		direction: "left",
		content: [
			{
				items: [
					{
						name: "Cards",
						icon: IconBlankCard,
						href: "/cards",
					},
					// {
					// 	name: "Organizations",
					// 	icon: IconBuilding,
					// 	href: "/organization",
					// },
				],
			},
			{
				name: "Insights",
				items: [
					{
						name: "Analytics",
						icon: LineChart,
						href: "/analytics",
					},
				],
			},
		],
	}),

	// Workspace settings
	workspaceSettings: () => ({
		title: "Settings",
		backHref: "/cards",
		direction: "right",
		content: [
			{
				name: "Workspace",
				items: [
					{
						name: "General",
						icon: Settings,
						href: "/workspace/settings",
						exact: true,
					},
				],
			},

			{
				name: "Account",
				items: [
					{
						name: "Notifications",
						icon: Bell,
						href: "/workspace/settings/notifications",
					},
				],
			},
		],
	}),

	// User settings
	userSettings: () => ({
		title: "Settings",
		backHref: "/cards",
		direction: "right",
		hideSwitcherIcons: true,
		content: [
			{
				name: "Account",
				items: [
					{
						name: "General",
						icon: Settings,
						href: "/settings/account",
						exact: true,
					},
					{
						name: "Security",
						icon: ShieldCheck,
						href: "/settings/security",
					},
				],
			},
		],
	}),
};

export function AppSidebarNav({ toolContent }: { toolContent?: ReactNode }) {
	const pathname = usePathname();
	return <SidebarNav areas={NAV_AREAS} data={{ pathname }} groups={NAV_GROUPS} toolContent={toolContent} />;
}
