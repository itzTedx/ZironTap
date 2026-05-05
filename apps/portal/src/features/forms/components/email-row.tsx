import { XIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Field, FieldLabel } from "@ziron/ui/components/field";
import { Group, GroupSeparator } from "@ziron/ui/components/group";
import { Input } from "@ziron/ui/components/input";

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

export const EmailRow = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.emails?.[0],
	props: { onRemove: () => {} },
	render: function EmailRowRender({ group, onRemove }) {
		return (
			<Field>
				<FieldLabel>Email</FieldLabel>

				<Group aria-label="Domain input" className="w-full">
					<group.AppField name="email">
						{(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Input
									aria-invalid={isInvalid}
									autoComplete="tel"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. +971 00 000 0000"
									type="tel"
									value={field.state.value}
								/>
							);
						}}
					</group.AppField>
					<GroupSeparator />
					<group.AppField name="label">
						{(field) => <field.SelectField isInputGroup items={EMAIL_TYPE} />}
					</group.AppField>

					<Button className="md:size-9" onClick={onRemove} size="icon" type="button" variant="destructive">
						<XIcon className="h-4 w-4" />
					</Button>
				</Group>
			</Field>
		);
	},
});
