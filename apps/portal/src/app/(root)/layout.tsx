import { AppSidebarNav } from "@/components/layout/sidebar/app-sidebar";
import { MainNav } from "@/components/layout/sidebar/main-nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <MainNav sidebar={AppSidebarNav}>{children}</MainNav>;
}
