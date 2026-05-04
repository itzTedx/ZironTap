import { XIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Group, GroupSeparator } from "@ziron/ui/components/group";

import { withFieldGroup } from "../hooks/use-app-form";
import { cardFormOpts } from "../options/cards-form-opts";

const EMAIL_TYPE = [
	{
		label: "Primary",
		value: "primary",
	},
	{
		label: "Work",
		value: "work",
	},
	{
		label: "Personal",
		value: "personal",
	},
];

export const PhoneRow = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.phones?.[0],

	render: function EmailRowRender({ group }) {
		return (
			<div className="flex items-center gap-2">
				<Group aria-label="Domain input">
					<group.AppField name="phone">
						{(field) => (
							<field.InputField autoComplete="tel" placeholder="e.g. +971 00 000 0000" type="tel" />
						)}
					</group.AppField>
					<GroupSeparator />
					<group.AppField name="label">
						{(field) => <field.SelectField isInputGroup items={EMAIL_TYPE} />}
					</group.AppField>

					<Button size="icon" type="button" variant="destructive">
						<XIcon className="h-4 w-4" />
					</Button>
				</Group>
			</div>
		);
	},
});
