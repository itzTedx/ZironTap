import Image from "next/image";

interface OrganizationHeaderProps {
	logo?: string | null;
	name?: string;
	id?: string;
	metadata?: string;
}

export const OrganizationHeader = ({ logo, name, id, metadata }: OrganizationHeaderProps) => {
	const data = JSON.parse(metadata!);

	return (
		<div className="flex items-center gap-4">
			<div className="relative flex size-16 items-center justify-center overflow-hidden rounded-md bg-muted p-2">
				{logo ? (
					<Image alt="Organization Logo" className="object-contain" height={60} src={logo} width={60} />
				) : (
					<Image
						alt="Organization Logo"
						className="object-cover"
						fill
						src="/png/placeholder-organization.png"
					/>
				)}
			</div>

			<div className="space-y-0.5">
				<h1 className="font-semibold text-2xl">{name}</h1>
				<p className="text-muted-foreground text-xs">{data.website}</p>
			</div>
		</div>
	);
};
