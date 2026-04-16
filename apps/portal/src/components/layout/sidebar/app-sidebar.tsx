"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { Bell, CardSim, LineChart, Settings, ShieldCheck, Tag, UserPlus } from "lucide-react";

import { IconBlankCard, IconDigitalCard } from "@ziron/ui/assets/icons/digital-card";
import { IconLinks } from "@ziron/ui/assets/icons/links";
import { IconQrCode } from "@ziron/ui/assets/icons/qr-code";
import { IconStarLine } from "@ziron/ui/assets/icons/stars";

import { DualColumnSidebar } from "./dual-column-sidebar";
import type { SidebarPanelLayers, SidebarRailModules, SidebarRuntimeData } from "./types";

const RAIL_MODULES: SidebarRailModules<SidebarRuntimeData> = [
	{
		name: "Digital Card",
		description: "Create, organize, and measure the performance of your digital cards.",
		icon: IconDigitalCard,
		href: "/cards",
		active: true,
	},
	{
		name: "QR Code",
		description: "Create, organize, and measure the performance of your QR codes.",
		icon: IconQrCode,
		href: "/qr",
		active: false,
	},
	{
		name: "Links",
		description: "Create, organize, and measure the performance of your links.",
		icon: IconLinks,
		href: "/links",
		active: false,
	},
	{
		name: "Reviews",
		description: "Create, organize, and measure the performance of your reviews.",
		icon: IconStarLine,
		href: "/reviews",
		active: false,
	},
];

const PANEL_LAYERS: SidebarPanelLayers<SidebarRuntimeData> = {
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
					{
						name: "Leads",
						icon: UserPlus,
						href: "/leads",
					},
				],
			},
			{
				name: "Management",
				items: [
					{
						name: "Templates",
						icon: CardSim,
						href: "/templates",
					},
					{
						name: "Tags",
						icon: Tag,
						href: "/tags",
					},
				],
			},
			{
				name: "Favorites",
				items: [
					{
						name: "Templates",
						icon: CardSim,
						href: "/templates",
					},
					{
						name: "Tags",
						icon: Tag,
						href: "/tags",
					},
				],
			},
		],
	}),

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

/** Portal app nav: rail modules + panel layers wired to ZironTap routes. */
export function PortalSidebar({ toolContent }: { toolContent?: ReactNode }) {
	const pathname = usePathname();
	return (
		<DualColumnSidebar
			data={{ pathname }}
			panelLayers={PANEL_LAYERS}
			railModules={RAIL_MODULES}
			toolContent={toolContent}
		/>
	);
}
