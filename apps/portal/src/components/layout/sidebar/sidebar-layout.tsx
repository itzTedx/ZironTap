import { SidebarInset, SidebarProvider } from "@ziron/ui/components/sidebar";

import { AppSidebar } from "./app-sidebar";

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>

			{/* <div className="absolute bottom-0 left-0 size-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary blur-3xl" /> */}
		</SidebarProvider>
	);
};
