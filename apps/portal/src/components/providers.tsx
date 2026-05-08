"use client";

import { useState } from "react";

import { RscBoundaryProvider } from "@rsc-boundary/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "@ziron/ui/components/toast";

import { createQueryClient } from "@/lib/orpc/query/client";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => createQueryClient());
	return (
		<RscBoundaryProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<ToastProvider timeout={1000} />
					{children}
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ThemeProvider>
		</RscBoundaryProvider>
	);
}
