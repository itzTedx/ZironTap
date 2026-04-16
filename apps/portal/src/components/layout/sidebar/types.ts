import type { ComponentType, ReactNode, SVGProps } from "react";

import type { Route } from "next";

import type { LucideIcon } from "lucide-react";

export type SidebarIcon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

/** Passed into panel layer resolvers (e.g. pathname for active logic). */
export type SidebarRuntimeData = {
	pathname: string;
};

export type SidebarPanelNavItemBase = {
	name: string;
	href: Route;
	exact?: boolean;

	badge?: ReactNode;
	arrow?: boolean;
	locked?: boolean;
};

export type SidebarPanelNavSubItem = SidebarPanelNavItemBase;

export type SidebarPanelNavItem = SidebarPanelNavItemBase & {
	icon: SidebarIcon;
	items?: SidebarPanelNavSubItem[];
};

/** One module in the narrow icon rail (switches high-level product areas). */
export type SidebarRailModule = {
	name: string;
	icon: SidebarIcon;
	href: Route;
	active: boolean;
	onClick?: () => void;
	popup?: ComponentType<{
		referenceElement: HTMLElement | null;
	}>;
	badge?: ReactNode;

	description: string;
	learnMoreHref?: string;
};

export type SidebarRailModules<_T extends Record<string, unknown>> = SidebarRailModule[];

/** One animated “layer” in the wide panel (e.g. main nav vs settings). */
export type SidebarPanelLayerDefinition = {
	title?: string | ReactNode;
	backHref?: Route;
	hideSwitcherIcons?: boolean;
	direction?: "left" | "right";
	content: {
		/** Section heading (e.g. “Insights”). */
		name?: string;
		items: SidebarPanelNavItem[];
	}[];
};

export type SidebarPanelLayers<T extends Record<string, unknown>> = Record<
	string,
	(args: T) => SidebarPanelLayerDefinition
>;
