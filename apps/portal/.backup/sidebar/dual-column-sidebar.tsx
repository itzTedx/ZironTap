"use client";

import type { ReactNode } from "react";
import { Suspense, useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { IconDigitalCard } from "@ziron/ui/assets/icons/digital-card";
import { cn } from "@ziron/ui/lib/utils";

import { NavigationPanelItem } from "./navigation-panel-item";
import { NavigationRailItem } from "./navigation-rail-item";
import type { SidebarPanelLayers, SidebarRailModules } from "./types";
import { NavigationPanelLayer } from "./ui/navigation-panel-layer";
import { RailNavTooltipProvider } from "./ui/rail-nav-tooltip-group";
import { ResponsiveSidebar } from "./ui/responsive-sidebar";
import { UserMenu } from "./user-menu";

interface DualColumnSidebarProps<T extends Record<string, unknown>> {
	/** Icon rail: top-level modules (e.g. Digital Cards). */
	railModules: SidebarRailModules<T>;
	/** Wide panel: stacked layers keyed by route “mode” (main, settings, …). */
	panelLayers: SidebarPanelLayers<T>;
	toolContent?: ReactNode;
	data: T;
}

export function DualColumnSidebar<T extends Record<string, unknown>>({
	railModules,
	panelLayers,
	toolContent,
	data,
}: DualColumnSidebarProps<T>) {
	const pathname = usePathname();

	const activeLayerId = useMemo(() => {
		if (pathname.startsWith("/settings/account")) return "userSettings";
		if (pathname.startsWith("/workspace/settings")) return "workspaceSettings";
		return "default";
	}, [pathname]);

	return (
		<ResponsiveSidebar>
			<nav className="grid size-full grid-cols-[var(--sidebar-groups-width)_1fr]">
				<div className="flex flex-col items-center justify-between">
					<RailNavTooltipProvider>
						<div className="flex flex-col items-center p-2">
							<div className="pt-2 pb-1">
								<Link
									className="block rounded-lg px-1 py-4 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-black/50"
									href="/"
								>
									<IconDigitalCard className="h-5" />
								</Link>
							</div>

							<div className="flex flex-col gap-3">
								{railModules.map((module, idx) => (
									<NavigationRailItem key={`${module.name}_${idx + 1}`} module={module} />
								))}
							</div>
						</div>
					</RailNavTooltipProvider>
					<div className="flex flex-col items-center gap-3 py-3">
						{toolContent}
						<div className="flex size-12 items-center justify-center">
							<Suspense>
								<UserMenu />
							</Suspense>
						</div>
					</div>
				</div>
				<div className={cn("size-full overflow-hidden py-2 pr-2 transition-opacity duration-300")}>
					<div className="scrollbar-hide relative flex h-full w-[calc(var(--sidebar-areas-width)-0.5rem)] flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-sidebar">
						<div className="relative flex grow flex-col p-3 text-muted-foreground">
							<div className="relative w-full grow">
								{Object.entries(panelLayers).map(([layerId, resolveLayer]) => {
									const { title, backHref, content, direction } = resolveLayer(data);

									const TitleContainer = backHref ? Link : "div";

									return (
										<NavigationPanelLayer
											direction={direction ?? "left"}
											key={layerId}
											visible={layerId === activeLayerId}
										>
											{title &&
												(typeof title === "string" ? (
													<TitleContainer
														className="group mb-2 flex items-center gap-3 px-3 py-2 text-sidebar-foreground"
														href={backHref ?? "#"}
													>
														{backHref && (
															<div
																className={cn(
																	"flex size-6 items-center justify-center rounded-md bg-muted/60",
																	"transition-[transform_background-color_color] duration-200 hover:bg-muted-foreground/20 group-hover:-translate-x-0.5 group-hover:text-foreground"
																)}
															>
																<ChevronLeft className="size-3 **:stroke-2" />
															</div>
														)}
														<span className="font-semibold text-content-emphasis text-lg">
															{title}
														</span>
													</TitleContainer>
												) : (
													title
												))}
											<div className="flex flex-col gap-8">
												{content.map(({ name: sectionLabel, items }, idx) => (
													<div
														className="flex flex-col gap-0.5"
														key={`${sectionLabel ?? "section"}_${idx + 1}`}
													>
														{sectionLabel && (
															<div className="mb-2 pl-3 text-muted-foreground/80 text-sm">
																{sectionLabel}
															</div>
														)}
														{items.map((item) => (
															<Suspense key={item.name}>
																<NavigationPanelItem item={item} />
															</Suspense>
														))}
													</div>
												))}
											</div>
										</NavigationPanelLayer>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</ResponsiveSidebar>
	);
}
