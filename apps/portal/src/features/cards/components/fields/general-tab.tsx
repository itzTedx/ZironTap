import { Card } from "@ziron/ui/components/card";
import { FieldGroup } from "@ziron/ui/components/field";
import { Map, MapControls } from "@ziron/ui/components/map";
import { TabsPanel } from "@ziron/ui/components/tabs";

import { EmailRow } from "@/features/forms/components/email-row";
import { PhoneRow } from "@/features/forms/components/phone-row";
import { withForm } from "@/features/forms/hooks/use-app-form";
import { cardFormOpts } from "@/features/forms/options/cards-form-opts";

import { CollapsibleFrame } from "../collapsible-frame";

export const GeneralTab = withForm({
	...cardFormOpts,
	props: {
		value: "general",
	},
	render: ({ form, value }) => {
		return (
			<TabsPanel className="space-y-3" value={value}>
				<CollapsibleFrame title="Basic Information">
					<FieldGroup>
						<form.AppField name="name">
							{(field) => (
								<field.InputField
									autoComplete="name"
									label="Full Name"
									placeholder="e.g. John Doe"
									required
									type="text"
								/>
							)}
						</form.AppField>

						<FieldGroup className="flex-row gap-3">
							<form.AppField mode="array" name="emails">
								{(field) =>
									field.state.value?.map((data, i) => (
										<EmailRow
											fields={`emails[${i}]`}
											form={form}
											key={`${Number(i + 1)}-${data.label}-${data.email}`}
										/>
									))
								}
							</form.AppField>
							<form.AppField mode="array" name="phones">
								{(field) =>
									field.state.value?.map((data, i) => (
										<PhoneRow
											fields={`phones[${i}]`}
											form={form}
											key={`${Number(i + 1)}-${data.label}-${data.phone}`}
										/>
									))
								}
							</form.AppField>
							{/* <form.AppField name="phones">
								{(field) => (
									<field.InputField
										autoComplete="tel"
										label="Phone"
										placeholder="e.g. +971 00 000 0000"
										type="tel"
									/>
								)}
							</form.AppField> */}
						</FieldGroup>

						<form.AppField name="bio">
							{(field) => (
								<field.TextField
									autoComplete="bio"
									label="Bio"
									maxLength={256}
									placeholder="Write a short bio about yourself or your role…"
									showCount
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</CollapsibleFrame>
				<CollapsibleFrame title="Organization">
					<FieldGroup>
						<form.AppField name="orgId">
							{(field) => <field.InputField label="Company" placeholder="Zirontap" required />}
						</form.AppField>

						<form.AppField name="jobTitle">
							{(field) => (
								<field.AutocompleteField label="Job Title" placeholder="e.g. Product Manager" />
							)}
						</form.AppField>
					</FieldGroup>
				</CollapsibleFrame>
				<CollapsibleFrame title="Location">
					<FieldGroup>
						<form.AppField name="address">
							{(field) => (
								<field.InputField label="Address" placeholder="e.g. Khalifa Street, Abu Dhabi, UAE" />
							)}
						</form.AppField>
						<form.AppField name="mapUrl">
							{(field) => (
								<field.InputField label="Map url" placeholder="Paste a Google Maps link" type="url" />
							)}
						</form.AppField>

						<Card className="h-[240px] overflow-hidden p-0">
							<Map center={[-74.006, 40.7128]} zoom={11}>
								<MapControls />
							</Map>
						</Card>
					</FieldGroup>
				</CollapsibleFrame>
			</TabsPanel>
		);
	},
});
