import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { EllipsisIcon } from "lucide-react";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldLabel } from "@ziron/ui/components/field";
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

export const EmailRow = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.emails?.[0],
	props: { onRemove: () => {}, index: 0 },
	render: function EmailRowRender({ group, index, onRemove }) {
		return (
			<group.AppField name="email">
				{(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field>
							<FieldLabel className={cn(index !== 0 && "sr-only")}>Phone</FieldLabel>
							<InputGroup aria-invalid={isInvalid}>
								<InputGroupAddon align="inline-start">
									<EnvelopeSimpleIcon className="text-muted-foreground" weight="fill" />
								</InputGroupAddon>
								<InputGroupInput
									autoComplete="email"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. name@company.com"
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
