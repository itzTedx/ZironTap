"use client";

import { useState } from "react";

import { LinkSimpleIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import { BrowsersIcon, ChartPieSliceIcon, PencilCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { FieldGroup } from "@ziron/ui/components/field";
import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { Tabs, TabsList, TabsTab } from "@ziron/ui/components/tabs";

import { JsonViewer } from "@/components/dev/json-viewer";
import PhoneMockup from "@/components/layout/preview/iphone";

import { useAppForm } from "../forms/hooks/use-app-form";
import { cardFormOpts } from "../forms/options/cards-form-opts";
import { CollapsibleFrame } from "./components/collapsible-frame";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { CustomizationTab } from "./tabs/customization-tab";
import { GeneralTab } from "./tabs/general-tab";
import { LinksTab } from "./tabs/links-tab";
import { ProfileHero } from "./tabs/profile-hero";
import { SeoTab } from "./tabs/seo-tab";

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
		icon: <BrowsersIcon weight="fill" />,
		title: "Seo",
		value: "seo",
	},
	{
		icon: <ChartPieSliceIcon weight="fill" />,
		title: "Analytics",
		value: "analytics",
	},
] as const;

export const CardForm = () => {
	const [data, setData] = useState({});
	const form = useAppForm({
		...cardFormOpts,
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
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="grid md:grid-cols-[1fr_360px]">
				<ScrollArea className="h-full">
					<FieldGroup className="container mt-4 mb-24 max-w-4xl">
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
							<SeoTab form={form} value="seo" />
							<AnalyticsTab form={form} value="analytics" />
						</Tabs>
					</FieldGroup>
				</ScrollArea>
				<aside className="sticky top-14 h-[91svh]">
					<div className="m-4 h-full space-y-3 rounded-md border bg-muted">
						<div className="m-1 rounded-md bg-muted p-3">
							<h3 className="mb-1 text-muted-foreground text-sm">Quick Action</h3>
							<div className="flex flex-wrap items-center gap-2">
								<Button variant="outline">Preview</Button>

								<form.AppForm>
									<form.SubmitButton label="Create Card" />
								</form.AppForm>
							</div>
						</div>

						<CollapsibleFrame title="Properties">Status</CollapsibleFrame>

						<JsonViewer data={data} defaultExpanded={2} rootName="form-data" />

						<CollapsibleFrame className="flex items-center justify-center overflow-hidden" title="Preview">
							<PhoneMockup>
								<ScrollArea>
									<div className="w-full p-4">
										<p>Hello</p>
									</div>
								</ScrollArea>
							</PhoneMockup>
						</CollapsibleFrame>

						<div className="mt-auto border-t p-3" />
					</div>
				</aside>
			</div>
		</form>
	);
};
