"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { LinkSimpleIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import {
	ChartPieSliceIcon,
	ContactlessPaymentIcon,
	DownloadIcon,
	EyeIcon,
	PencilCircleIcon,
	PlusIcon,
	QrCodeIcon,
	WarningIcon,
} from "@phosphor-icons/react/dist/ssr";

import { TimerIcon } from "@ziron/ui/assets/icons/timer";
import { Button } from "@ziron/ui/components/button";
import { FieldGroup } from "@ziron/ui/components/field";
import { Group, GroupSeparator } from "@ziron/ui/components/group";
import { QRCode, QRCodeCanvas, QRCodeDownload, QRCodeSkeleton } from "@ziron/ui/components/qr-code";
import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { Tabs, TabsList, TabsTab } from "@ziron/ui/components/tabs";

import { JsonViewer } from "@/components/dev/json-viewer";
import PhoneMockup from "@/components/layout/preview/iphone";

import { useAppForm } from "../forms/hooks/use-app-form";
import { cardFormOpts } from "../forms/options/cards-form-opts";
import { CardActionBar } from "./components/action-bar";
import { Collapsible } from "./components/collapsible";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { CustomizationTab } from "./tabs/customization-tab";
import { GeneralTab } from "./tabs/general-tab";
import { LinksTab } from "./tabs/links-tab";
import { ProfileHero } from "./tabs/profile-hero";

const TABS = [
	{
		icon: <UserCircleDashedIcon weight="fill" />,
		title: "General",
		value: "general",
	},
	{
		icon: <LinkSimpleIcon weight="bold" />,
		title: "Links",
		value: "links",
	},
	{
		icon: <PencilCircleIcon weight="fill" />,
		title: "Customization",
		value: "customization",
	},
	{
		icon: <ChartPieSliceIcon weight="fill" />,
		title: "Analytics",
		value: "analytics",
	},
] as const;

const SLUG_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const DEFAULT_SLUG_LENGTH = 7;

function generateDefaultSlug(length = DEFAULT_SLUG_LENGTH) {
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);

	return Array.from(randomValues, (value) => SLUG_ALPHABET[value % SLUG_ALPHABET.length]).join("");
}

export const CardForm = () => {
	const [data, setData] = useState({});
	const [defaultSlug] = useState(() => generateDefaultSlug());
	const params = useParams<{ orgId: string }>();

	const form = useAppForm({
		...cardFormOpts,
		defaultValues: {
			...cardFormOpts.defaultValues,
			slug: defaultSlug,
			orgId: params.orgId,
		},
		onSubmit: ({ value }) => {
			setData(value);
			console.log("FORM VALUES:", value);
		},
		onSubmitInvalid({ formApi }) {
			const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement;
			console.log("Invalid", formApi.getAllErrors());
			InvalidInput?.focus();

			setData(formApi.getAllErrors());
		},
	});

	return (
		<form
			className="grid md:grid-cols-[1fr_440px]"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<ScrollArea className="h-full">
				<FieldGroup className="container mt-4 mb-20 max-w-4xl">
					<ProfileHero form={form} />

					<Tabs defaultValue="general">
						<TabsList className="w-full">
							{TABS.map(({ icon, value, title }) => (
								<TabsTab key={value} value={value}>
									{icon}
									{title}
								</TabsTab>
							))}
						</TabsList>
						<GeneralTab form={form} value="general" />
						<LinksTab form={form} value="links" />
						<CustomizationTab form={form} value="customization" />
						<AnalyticsTab form={form} value="analytics" />
					</Tabs>

					<CardActionBar form={form} />
				</FieldGroup>
			</ScrollArea>
			<aside className="sticky top-16 m-4 h-fit rounded-md border bg-muted">
				<div className="sticky top-1 z-99 m-1 rounded-md bg-muted p-3 backdrop-blur-2xl">
					<h3 className="mb-1 text-muted-foreground text-sm">Quick Action</h3>
					<div className="flex flex-wrap items-center gap-2">
						<Button variant="outline">
							<EyeIcon weight="fill" /> Preview
						</Button>
						<Group aria-label="Pagination">
							<Group aria-label="Page numbers">
								<Button className="min-w-8" variant="outline">
									<QrCodeIcon weight="fill" />
								</Button>
								<GroupSeparator />
								<Button className="min-w-8" variant="outline">
									<ContactlessPaymentIcon weight="fill" />
								</Button>
							</Group>
							<Group aria-label="Navigation">
								<Button className="min-w-8" variant="outline">
									<DownloadIcon aria-hidden="true" weight="fill" />
								</Button>
							</Group>
							<Group aria-label="Navigation">
								<Button className="min-w-8" variant="destructive-outline">
									<WarningIcon aria-hidden="true" weight="fill" />
								</Button>
							</Group>
						</Group>

						<form.AppForm>
							<form.SubmitButton label="Create Card" />
						</form.AppForm>
					</div>
				</div>
				<ScrollArea className="h-[83svh] flex-1 overflow-hidden" scrollFade>
					<Collapsible className="space-y-3" title="Properties">
						<div className="flex items-center">
							<span className="w-20 text-foreground/80 text-sm">Status</span>

							<div className="flex items-center gap-2">
								<TimerIcon className="text-warning" /> Draft
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-20 text-foreground/80 text-sm">Labels</span>

							<div className="flex items-center gap-1 rounded-md bg-muted p-1.5">
								<div className="flex h-7 items-center justify-center gap-2 rounded-sm bg-accent px-2 py-1 text-sm">
									<div className="size-2 rounded-full bg-destructive" />
									<p>Event</p>
								</div>
								<div className="flex h-7 items-center justify-center gap-2 rounded-sm bg-accent px-2 py-1 text-sm">
									<div className="size-2 rounded-full bg-brand-500" />
									<p>Personal</p>
								</div>
								<div className="flex size-7 items-center justify-center rounded-sm hover:bg-accent">
									<PlusIcon />
								</div>
							</div>
						</div>
					</Collapsible>
					<Collapsible title="QR code">
						<div className=" ">
							{/* <ShimmerDots className="mask-[radial-gradient(40%_80%,transparent_20%,black)] opacity-50 dark:opacity-30" /> */}
							<QRCode
								className="relative flex items-center justify-center gap-6 overflow-hidden rounded-md border bg-background p-6"
								size={120}
								value="https://zironpro.ae"
							>
								<div
									className="pointer-events-none absolute inset-0 h-full w-full animate-mask-pan bg-repeat"
									style={{
										maskImage: "url(/png/noise.png)",
									}}
								>
									<div
										className="absolute inset-0"
										style={{
											backgroundImage: "url(/svg/shimmer-dots.svg)",
										}}
									/>
								</div>
								<QRCodeSkeleton />
								<QRCodeCanvas className="rounded-md" />
								<div className="absolute top-2 right-2 z-10">
									<QRCodeDownload
										filename="qr-canvas"
										format="png"
										render={<Button className="backdrop-blur-md" size="icon" variant="outline" />}
									>
										<DownloadIcon />
									</QRCodeDownload>
								</div>
							</QRCode>
							{/* <QRCode
								className="rounded-md dark:invert"
								scale={1}
								url={constructUrl(data.slug ?? "")}
							/> */}
						</div>
					</Collapsible>
					<Collapsible title="Form Data">
						<JsonViewer data={data} defaultExpanded={2} rootName="form-data" />
					</Collapsible>
					<Collapsible className="flex items-center justify-center overflow-hidden" title="Preview">
						<PhoneMockup>
							<ScrollArea>
								<div className="w-full p-4">
									<p>Hello</p>
								</div>
							</ScrollArea>
						</PhoneMockup>
					</Collapsible>

					<div className="mt-auto border-t p-3" />
				</ScrollArea>
			</aside>
		</form>
	);
};
