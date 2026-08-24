import { Logo } from "@ziron/ui/assets/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-radial-[at_50%_0%] from-zinc-900/50 to-transparent">
			<div className="absolute top-4 left-4 flex size-14 items-center justify-center rounded-sm p-1 transition-colors hover:bg-accent">
				<Logo className="size-8 shrink-0" />
			</div>
			{children}
		</div>
	);
}
