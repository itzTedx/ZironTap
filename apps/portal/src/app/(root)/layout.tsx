import { PortalSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarPageLayout } from "@/components/layout/sidebar/sidebar-page-layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <SidebarPageLayout sidebar={PortalSidebar}>{children}</SidebarPageLayout>;
}
