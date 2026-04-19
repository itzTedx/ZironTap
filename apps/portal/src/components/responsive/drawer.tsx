"use client";

import * as React from "react";

import { CopyIcon, EllipsisIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-react";

import { Button } from "@ziron/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerMenu,
	DrawerMenuCheckboxItem,
	DrawerMenuGroup,
	DrawerMenuGroupLabel,
	DrawerMenuItem,
	DrawerMenuRadioGroup,
	DrawerMenuRadioItem,
	DrawerMenuSeparator,
	DrawerMenuTrigger,
	DrawerPanel,
	DrawerPopup,
	DrawerTrigger,
} from "@ziron/ui/components/drawer";
import {
	Menu,
	MenuCheckboxItem,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
} from "@ziron/ui/components/menu";
import { useMediaQuery } from "@ziron/ui/hooks/use-media-query";
import { cn } from "@ziron/ui/lib/utils";

const ResponsiveMenuContext = React.createContext<{ isMobile: boolean } | null>(null);

export function useResponsiveMenu(): { isMobile: boolean } {
	const ctx = React.useContext(ResponsiveMenuContext);
	if (!ctx) {
		throw new Error("useResponsiveMenu must be used within ResponsiveMenu");
	}
	return ctx;
}

export type ResponsiveMenuProps = {
	children: React.ReactNode;
	className?: string;
	/** When set, skips `useMediaQuery` and fixes the branch (e.g. tests, Storybook). */
	matchMobile?: boolean;
	/** Argument to `useMediaQuery` when `matchMobile` is not set. @default "max-md" */
	media?: Parameters<typeof useMediaQuery>[0];
};

/**
 * Picks mobile (drawer) vs desktop (dropdown) using a media query, then exposes `isMobile`
 * to nested `ResponsiveMenuMobile` / `ResponsiveMenuDesktop` branches — same idea as
 * shadcn compound roots (`data-slot`, single provider).
 */
export function ResponsiveMenu({ children, className, matchMobile, media = "max-md" }: ResponsiveMenuProps) {
	const queried = useMediaQuery(media);
	const isMobile = matchMobile ?? queried;

	return (
		<ResponsiveMenuContext.Provider value={{ isMobile }}>
			<div className={cn("contents", className)} data-slot="responsive-menu">
				{children}
			</div>
		</ResponsiveMenuContext.Provider>
	);
}

export type ResponsiveMenuBranchProps = {
	children: React.ReactNode;
};

/** Renders children only when the responsive menu is in the mobile (drawer) branch. */
export function ResponsiveMenuMobile({ children }: ResponsiveMenuBranchProps) {
	const { isMobile } = useResponsiveMenu();
	if (!isMobile) return null;
	return <>{children}</>;
}

/** Renders children only when the responsive menu is in the desktop (menu) branch. */
export function ResponsiveMenuDesktop({ children }: ResponsiveMenuBranchProps) {
	const { isMobile } = useResponsiveMenu();
	if (isMobile) return null;
	return <>{children}</>;
}

export const overflowMenuDefaultTriggerAriaLabel = "Open menu";

export type OverflowMenuIconTriggerProps = Omit<
	React.ComponentProps<typeof Button>,
	"children" | "size" | "variant"
> & {
	/** Accessible name; defaults to {@link overflowMenuDefaultTriggerAriaLabel}. */
	"aria-label"?: string;
};

/** Icon-only outline trigger for overflow menus; use with `render={<OverflowMenuIconTrigger />}` on DrawerTrigger / MenuTrigger. */
export function OverflowMenuIconTrigger({
	"aria-label": ariaLabel = overflowMenuDefaultTriggerAriaLabel,
	...props
}: OverflowMenuIconTriggerProps) {
	return (
		<Button aria-label={ariaLabel} size="icon" variant="outline" {...props}>
			<EllipsisIcon aria-hidden />
		</Button>
	);
}

/** Example: nested drawer on small viewports, cascading menu on larger — copy and adapt the inner trees. */
export function ActionsOverflowMenu() {
	return (
		<ResponsiveMenu>
			<ResponsiveMenuMobile>
				<Drawer>
					<DrawerTrigger render={<OverflowMenuIconTrigger />} />
					<DrawerPopup showBar>
						<DrawerPanel>
							<DrawerMenu>
								<DrawerMenuGroup>
									<DrawerMenuGroupLabel>Actions</DrawerMenuGroupLabel>
									<DrawerClose render={<DrawerMenuItem />}>
										<PencilIcon aria-hidden />
										Edit
									</DrawerClose>
									<DrawerClose render={<DrawerMenuItem />}>
										<CopyIcon aria-hidden />
										Duplicate
									</DrawerClose>
									<DrawerClose render={<DrawerMenuItem />}>
										<ShareIcon aria-hidden />
										Share
									</DrawerClose>
								</DrawerMenuGroup>
								<DrawerMenuSeparator />
								<DrawerMenuCheckboxItem>Shuffle</DrawerMenuCheckboxItem>
								<DrawerMenuCheckboxItem>Repeat</DrawerMenuCheckboxItem>
								<DrawerMenuCheckboxItem disabled>Enhanced Audio</DrawerMenuCheckboxItem>
								<DrawerMenuSeparator />
								<DrawerMenuGroup>
									<DrawerMenuGroupLabel>Sort by</DrawerMenuGroupLabel>
									<DrawerMenuRadioGroup defaultValue="artist">
										<DrawerMenuRadioItem value="artist">Artist</DrawerMenuRadioItem>
										<DrawerMenuRadioItem value="album">Album</DrawerMenuRadioItem>
										<DrawerMenuRadioItem value="title">Title</DrawerMenuRadioItem>
									</DrawerMenuRadioGroup>
								</DrawerMenuGroup>
								<DrawerMenuSeparator />
								<DrawerMenuCheckboxItem variant="switch">Auto save</DrawerMenuCheckboxItem>
								<DrawerMenuSeparator />
								<Drawer>
									<DrawerMenuTrigger>Add to Playlist</DrawerMenuTrigger>
									<DrawerPopup showBar>
										<DrawerPanel>
											<DrawerMenu>
												<DrawerMenuGroup>
													<DrawerMenuGroupLabel>Add to Playlist</DrawerMenuGroupLabel>
												</DrawerMenuGroup>
												<DrawerClose render={<DrawerMenuItem />}>Jazz</DrawerClose>
												<Drawer>
													<DrawerMenuTrigger>Rock</DrawerMenuTrigger>
													<DrawerPopup showBar>
														<DrawerPanel>
															<DrawerMenu>
																<DrawerMenuGroup>
																	<DrawerMenuGroupLabel>Rock</DrawerMenuGroupLabel>
																</DrawerMenuGroup>
																<DrawerClose render={<DrawerMenuItem />}>
																	Hard Rock
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Soft Rock
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Classic Rock
																</DrawerClose>
																<DrawerMenuSeparator />
																<DrawerClose render={<DrawerMenuItem />}>
																	Metal
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Punk
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Grunge
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Alternative
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Indie
																</DrawerClose>
																<DrawerClose render={<DrawerMenuItem />}>
																	Electronic
																</DrawerClose>
															</DrawerMenu>
														</DrawerPanel>
													</DrawerPopup>
												</Drawer>
												<DrawerClose render={<DrawerMenuItem />}>Pop</DrawerClose>
											</DrawerMenu>
										</DrawerPanel>
									</DrawerPopup>
								</Drawer>
								<DrawerMenuSeparator />
								<DrawerMenuGroup>
									<DrawerMenuGroupLabel>Danger zone</DrawerMenuGroupLabel>
									<DrawerClose render={<DrawerMenuItem variant="destructive" />}>
										<TrashIcon aria-hidden />
										Delete
									</DrawerClose>
								</DrawerMenuGroup>
							</DrawerMenu>
						</DrawerPanel>
					</DrawerPopup>
				</Drawer>
			</ResponsiveMenuMobile>
			<ResponsiveMenuDesktop>
				<Menu>
					<MenuTrigger render={<OverflowMenuIconTrigger />} />
					<MenuPopup>
						<MenuGroup>
							<MenuGroupLabel>Actions</MenuGroupLabel>
							<MenuItem>
								<PencilIcon aria-hidden />
								Edit
							</MenuItem>
							<MenuItem>
								<CopyIcon aria-hidden />
								Duplicate
							</MenuItem>
							<MenuItem>
								<ShareIcon aria-hidden />
								Share
							</MenuItem>
						</MenuGroup>
						<MenuSeparator />
						<MenuCheckboxItem>Shuffle</MenuCheckboxItem>
						<MenuCheckboxItem>Repeat</MenuCheckboxItem>
						<MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
						<MenuSeparator />
						<MenuGroup>
							<MenuGroupLabel>Sort by</MenuGroupLabel>
							<MenuRadioGroup defaultValue="artist">
								<MenuRadioItem value="artist">Artist</MenuRadioItem>
								<MenuRadioItem value="album">Album</MenuRadioItem>
								<MenuRadioItem value="title">Title</MenuRadioItem>
							</MenuRadioGroup>
						</MenuGroup>
						<MenuSeparator />
						<MenuCheckboxItem variant="switch">Auto save</MenuCheckboxItem>
						<MenuSeparator />
						<MenuSub>
							<MenuSubTrigger>Add to Playlist</MenuSubTrigger>
							<MenuSubPopup>
								<MenuItem>Jazz</MenuItem>
								<MenuSub>
									<MenuSubTrigger>Rock</MenuSubTrigger>
									<MenuSubPopup>
										<MenuItem>Hard Rock</MenuItem>
										<MenuItem>Soft Rock</MenuItem>
										<MenuItem>Classic Rock</MenuItem>
										<MenuSeparator />
										<MenuItem>Metal</MenuItem>
										<MenuItem>Punk</MenuItem>
										<MenuItem>Grunge</MenuItem>
										<MenuItem>Alternative</MenuItem>
										<MenuItem>Indie</MenuItem>
										<MenuItem>Electronic</MenuItem>
									</MenuSubPopup>
								</MenuSub>
								<MenuItem>Pop</MenuItem>
							</MenuSubPopup>
						</MenuSub>
						<MenuSeparator />
						<MenuGroup>
							<MenuGroupLabel>Danger zone</MenuGroupLabel>
							<MenuItem variant="destructive">
								<TrashIcon aria-hidden />
								Delete
							</MenuItem>
						</MenuGroup>
					</MenuPopup>
				</Menu>
			</ResponsiveMenuDesktop>
		</ResponsiveMenu>
	);
}
