import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
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
							<form.Field mode="array" name="emails">
								{(field) => {
									return (
										<div className="w-full space-y-2">
											{field.state.value?.map((data, i) => {
												return (
													<EmailRow
														fields={`emails[${i}]`}
														form={form}
														index={i}
														key={`${Number(i + 1)}-${data.label}-${data.email}`}
														onRemove={() => field.removeValue(i)}
													/>
												);
											})}
											<Button
												onClick={() => field.pushValue({ label: "Work", email: "" })}
												type="button"
												variant="link"
											>
												<PlusIcon /> Add work or personal email
											</Button>
										</div>
									);
								}}
							</form.Field>
							<form.Field mode="array" name="phones">
								{(field) => {
									return (
										<div className="w-full space-y-2">
											{field.state.value?.map((data, i) => {
												return (
													<PhoneRow
														fields={`phones[${i}]`}
														form={form}
														index={i}
														key={`${Number(i + 1)}-${data.label}-${data.phone}`}
														onRemove={() => field.removeValue(i)}
													/>
												);
											})}
											<Button
												onClick={() => field.pushValue({ label: "Work", phone: "" })}
												type="button"
												variant="link"
											>
												<PlusIcon /> Add another number
											</Button>
										</div>
									);
								}}
							</form.Field>
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
							<Map center={[24.4547, 54.3916]} zoom={11}>
								<MapControls />
							</Map>
						</Card>
					</FieldGroup>
				</CollapsibleFrame>
			</TabsPanel>
		);
	},
});
