import { SidebarInset, SidebarProvider, SidebarTrigger } from "@ziron/ui/components/sidebar";

import { AppSidebar } from "./app-sidebar";

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main>
					<SidebarTrigger />
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};
