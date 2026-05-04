import { EnvelopeSimpleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { ButtonGroup } from "@ziron/ui/components/group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ziron/ui/components/input-group";
import { cn } from "@ziron/ui/lib/utils";

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

	render: function EmailRowRender({ group }) {
		return (
			<div className="flex items-center gap-2">
				<ButtonGroup className="w-full">
					<InputGroup>
						<group.AppField name="email">
							{(field) => (
								<InputGroupInput
									className={cn("w-full rounded-e-none border-r-0")}
									id={field.name}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="name@company.com"
									value={field.state.value}
								/>
							)}
						</group.AppField>

						<InputGroupAddon>
							<EnvelopeSimpleIcon className="size-4 text-muted-foreground" weight="fill" />
						</InputGroupAddon>
					</InputGroup>

					<group.AppField name="label">
						{(field) => <field.SelectField isInputGroup items={EMAIL_TYPE} />}
					</group.AppField>

					{/* {fields.length > 1 && (
                        <Button
                            className={cn("shrink-0 border-input-border bg-input")}
                            onClick={() => remove(i)}
                            size="icon"
                            type="button"
                            variant="outline"
                        >
                            <IconX className="size-4 text-muted-foreground" />
                        </Button>
                    )} */}
					<Button type="button" variant="destructive-outline">
						<XIcon className="h-4 w-4" />
					</Button>
				</ButtonGroup>
				{/* <Group aria-label="Domain input">
                    <group.AppField name="label">{(field) => <field.InputField />}</group.AppField>
                    <GroupSeparator />
                    <group.AppField name="value">
                        {(field) => <field.SelectField isInputGroup items={EMAIL_TYPE} />}
                    </group.AppField>

                    <Button size="icon" type="button" variant="destructive">
                        <XIcon className="h-4 w-4" />
                    </Button>
                </Group> */}
			</div>
		);
	},
});
