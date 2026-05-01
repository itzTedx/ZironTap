import { SidebarTrigger } from "@ziron/ui/components/sidebar";

export default function CardsPage() {
	return (
		<div className="flex flex-col gap-2 p-6">
			<h1 className="font-semibold text-lg tracking-tight">Cards</h1>
			<SidebarTrigger />
			<p className="text-muted-foreground text-sm">Manage your digital cards here.</p>
		</div>
	);
}
