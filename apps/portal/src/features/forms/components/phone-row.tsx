import { PhoneIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { EllipsisIcon } from "lucide-react";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldLabel } from "@ziron/ui/components/field";
import { Group, GroupSeparator } from "@ziron/ui/components/group";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ziron/ui/components/input-group";
import {
	Menu,
	MenuItem,
	MenuPopup,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
} from "@ziron/ui/components/menu";
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

export const PhoneRow = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.phones?.[0],
	props: { onRemove: () => {}, index: 0 },
	render: function EmailRowRender({ group, index, onRemove }) {
		return (
			<group.AppField name="phone">
				{(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field>
							<FieldLabel className={cn(index !== 0 && "sr-only")}>Phone</FieldLabel>
							<InputGroup aria-invalid={isInvalid}>
								<InputGroupAddon align="inline-start">
									<PhoneIcon className="text-muted-foreground" weight="fill" />
								</InputGroupAddon>
								<InputGroupInput
									autoComplete="tel"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. +971 00 000 0000"
									type="tel"
									value={field.state.value}
								/>
								<InputGroupAddon align="inline-end">
									<Badge variant="info">Primary</Badge>
									<Menu>
										<MenuTrigger
											render={<Button aria-label="Open menu" size="icon-xs" variant="ghost" />}
										>
											<EllipsisIcon />
										</MenuTrigger>
										<MenuPopup align="end" alignOffset={-4} sideOffset={8}>
											<MenuSub>
												<MenuSubTrigger>Label</MenuSubTrigger>
												<MenuSubPopup>
													<group.AppField name="label">
														{(subField) => {
															return (
																<MenuRadioGroup
																	defaultValue="primary"
																	onValueChange={(v) => subField.handleChange(v)}
																	value={subField.state.value}
																>
																	{EMAIL_TYPE.map((type) => (
																		<MenuRadioItem
																			key={type.value}
																			value={type.value}
																		>
																			{type.label}
																		</MenuRadioItem>
																	))}
																</MenuRadioGroup>
															);
														}}
													</group.AppField>
												</MenuSubPopup>
											</MenuSub>

											<MenuItem disabled={index === 0} onClick={onRemove} variant="destructive">
												Delete
											</MenuItem>
										</MenuPopup>
									</Menu>
								</InputGroupAddon>
							</InputGroup>
						</Field>
					);
				}}
			</group.AppField>
		);
	},
});

export const PhoneRowBackup = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.phones?.[0],
	props: { onRemove: () => {} },
	render: function EmailRowRender({ group, onRemove }) {
		return (
			<Field>
				<FieldLabel>Phone</FieldLabel>
				<Group aria-label="Domain input" className="w-full">
					<group.AppField name="phone">
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
