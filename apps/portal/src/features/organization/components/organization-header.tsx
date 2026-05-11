import Image from "next/image";

interface OrganizationHeaderProps {
	logo?: string | null;
	name?: string;
	id?: string;
}

export const OrganizationHeader = ({ logo, name, id }: OrganizationHeaderProps) => {
	return (
		<div className="flex items-center gap-4">
			<div className="relative flex size-16 items-center justify-center overflow-hidden rounded-md bg-muted">
				{logo ? (
					<Image alt="Organization Logo" className="object-contain" fill src={logo} />
				) : (
					<Image
						alt="Organization Logo"
						className="object-cover"
						fill
						src="/png/placeholder-organization.png"
					/>
				)}
			</div>

			<div className="space-y-1">
				<h1 className="font-semibold text-2xl">{name}</h1>
				<p className="text-muted-foreground text-xs">{id}</p>
			</div>
		</div>
	);
};
