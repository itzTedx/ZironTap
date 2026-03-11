"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "@ziron/ui/components/toast";
import { useState } from "react";
import { createQueryClient } from "@/lib/orpc/query/client";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => createQueryClient());
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<ToastProvider />
				{children}
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
