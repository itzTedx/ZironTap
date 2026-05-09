import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { useStore } from "@tanstack/react-form-nextjs";
import { EllipsisIcon } from "lucide-react";

import { Badge } from "@ziron/ui/components/badge";
import { Button } from "@ziron/ui/components/button";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
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
		const label = useStore(group.store, (state) => state.values.label);

		return (
			<group.AppField name="email">
				{(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel className={cn(index !== 0 && "sr-only")} htmlFor={field.name}>
								Email
							</FieldLabel>
							<InputGroup aria-invalid={isInvalid}>
								<InputGroupAddon align="inline-start">
									<EnvelopeSimpleIcon className="text-muted-foreground" weight="fill" />
								</InputGroupAddon>

								<InputGroupInput
									autoComplete="home email"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. name@company.com"
									type="email"
									value={field.state.value}
								/>

								<InputGroupAddon align="inline-end">
									<Badge className="capitalize" variant="info">
										{label}
									</Badge>
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
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			</group.AppField>
		);
	},
});
