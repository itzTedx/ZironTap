"use client";

import { LinkSimpleIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import { PencilCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { FieldGroup } from "@ziron/ui/components/field";
import { ScrollArea } from "@ziron/ui/components/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ziron/ui/components/tabs";

import { useAppForm } from "../forms/hooks/use-app-form";
import { cardFormOpts } from "../forms/options/cards-form-opts";
import { GeneralTab } from "./components/fields/general-tab";
import { ProfileHero } from "./components/fields/profile-hero";

export const CardForm = () => {
	const form = useAppForm({
		...cardFormOpts,
		onSubmit: ({ value }) => {
			console.log("FORM VALUES:", value);
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
								<TabsTab value="general">
									<UserCircleDashedIcon weight="fill" />
									General
								</TabsTab>
								<TabsTab value="links">
									<LinkSimpleIcon weight="bold" /> Links
								</TabsTab>
								<TabsTab value="customization">
									<PencilCircleIcon weight="fill" /> Customization
								</TabsTab>
							</TabsList>
							<GeneralTab form={form} value="general" />
							<TabsPanel value="links">Tab 2 content</TabsPanel>
							<TabsPanel value="customization">Tab 3 content</TabsPanel>
						</Tabs>
					</FieldGroup>
				</ScrollArea>
				<aside className="sticky top-14 h-[91svh]">
					<div className="m-4 h-full rounded-md border bg-muted p-1">
						<div className="rounded-md bg-muted p-3">
							<h3 className="text-md text-muted-foreground">Quick Action</h3>
							<div>
								<Button variant="outline">Preview</Button>
							</div>
						</div>
						<form.AppForm>
							<form.SubmitButton label="Save" />
						</form.AppForm>
					</div>
				</aside>
			</div>
		</form>
	);
};
