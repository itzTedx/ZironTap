import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

import { Field, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@ziron/ui/components/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ziron/ui/components/tooltip";
import { cn } from "@ziron/ui/lib/utils";

import { withFieldGroup } from "../hooks/use-app-form";
import { cardFormOpts } from "../options/cards-form-opts";

export const LinkRow = withFieldGroup({
	defaultValues: cardFormOpts.defaultValues.links?.[0],
	render: function EmailRowRender({ group }) {
		return (
			<FieldGroup className="grid grid-cols-[1fr_0.5fr] gap-3">
				<group.AppField name="url">
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel className="sr-only">Link</FieldLabel>
								<field.InputField aria-label="Set your URL" placeholder="@username" />
							</Field>
						);
					}}
				</group.AppField>
				<group.AppField name="label">
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel className="sr-only">Link</FieldLabel>
								<InputGroup data-invalid={isInvalid}>
									<InputGroupInput
										aria-label="Enter Display Text"
										data-invalid={isInvalid}
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Display Text"
										value={field.state.value}
									/>
									<Tooltip>
										<InputGroupAddon>
											<InputGroupText className={cn({ "text-destructive": isInvalid })}>
												<TooltipTrigger>
													<InfoIcon weight="fill" />
												</TooltipTrigger>
											</InputGroupText>
										</InputGroupAddon>
										<TooltipContent>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</TooltipContent>
									</Tooltip>
								</InputGroup>
							</Field>
						);
					}}
				</group.AppField>
			</FieldGroup>
		);
	},
});
