"use client";

import type * as React from "react";
import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { mergeProps } from "@ziron/ui/base-ui/merge-props";
import { useRender } from "@ziron/ui/base-ui/use-render";
import { cn } from "@ziron/ui/utils";

import { authClient } from "@/lib/auth/client";

interface LogoutButtonProps extends useRender.ComponentProps<"button"> {}

export const LogoutButton = ({ className, render, ...props }: LogoutButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	function logout() {
		startTransition(async () => {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/login");
					},
				},
			});
		});
	}

	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				"aria-disabled": isPending,
				className: cn("flex cursor-pointer items-center gap-2", className),
				"data-slot": "button",
				disabled: isPending,
				onClick: logout,
			} as React.ButtonHTMLAttributes<HTMLButtonElement>,
			props
		),
		render,
	});
};
