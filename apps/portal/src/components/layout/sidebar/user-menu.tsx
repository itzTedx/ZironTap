"use client";

import Link from "next/link";

import { LogOutIcon } from "lucide-react";

import { IconUser } from "@ziron/ui/assets/icons/user";
import { Avatar, AvatarFallback, AvatarImage } from "@ziron/ui/components/avatar";
import { Button } from "@ziron/ui/components/button";
import {
	Menu,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuSeparator,
	MenuTrigger,
} from "@ziron/ui/components/menu";
import { Skeleton } from "@ziron/ui/components/skeleton";

import { LogoutButton } from "@/features/auth/components/logout-button";
import { useSession } from "@/lib/auth/client";

export function UserMenu() {
	const { data, isPending } = useSession();
	const user = data?.user;

	return (
		<>
			<Menu>
				<MenuTrigger render={<Button size="icon-lg" variant="ghost" />}>
					<Avatar className="size-8 rounded-lg">
						{isPending ? (
							<Skeleton className="size-full rounded-[inherit]" />
						) : (
							<>
								<AvatarImage alt={user?.name ?? ""} src={user?.image ?? undefined} />
								<AvatarFallback className="rounded-lg">{user?.name?.slice(0, 2) ?? ""}</AvatarFallback>
							</>
						)}
					</Avatar>
				</MenuTrigger>
				<MenuPopup align="end" className="ml-2 min-w-48 rounded-lg" sideOffset={6}>
					<MenuGroup>
						<MenuGroupLabel className="font-normal">
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user?.name ?? ""}</span>
								<span className="truncate text-muted-foreground text-xs">{user?.email ?? ""}</span>
							</div>
						</MenuGroupLabel>
					</MenuGroup>
					<MenuSeparator />
					<MenuGroup>
						<MenuItem closeOnClick render={<Link href="/settings/account" />}>
							<IconUser className="size-4 text-muted-foreground" />
							Account Settings
						</MenuItem>
						<MenuItem closeOnClick nativeButton render={<LogoutButton className="w-full" />}>
							<LogOutIcon className="size-4 text-muted-foreground" />
							Log out
						</MenuItem>
					</MenuGroup>
				</MenuPopup>
			</Menu>
		</>
	);
}
