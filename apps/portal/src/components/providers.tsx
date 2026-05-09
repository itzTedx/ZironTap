"use client";

import { useState } from "react";

import Script from "next/script";

import { RscBoundaryProvider } from "@rsc-boundary/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "@ziron/ui/components/toast";

import { createQueryClient } from "@/lib/orpc/query/client";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children, debug }: { children: React.ReactNode; debug?: boolean }) {
	const [queryClient] = useState(() => createQueryClient());

	return (
		<RscBoundaryProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<ToastProvider timeout={1000} />
					{children}

					{debug && (
						<Script
							crossOrigin="anonymous"
							src="//unpkg.com/react-scan/dist/auto.global.js"
							strategy="beforeInteractive"
						/>
					)}
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ThemeProvider>
		</RscBoundaryProvider>
	);
}
