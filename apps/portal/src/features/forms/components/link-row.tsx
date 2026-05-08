import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

import { Field, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupText } from "@ziron/ui/components/input-group";

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
									<field.InputField aria-label="Set your URL" group placeholder="Display Text" />

									<InputGroupAddon>
										<InputGroupText>
											<InfoIcon weight="fill" />
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						);
					}}
				</group.AppField>
			</FieldGroup>
		);
	},
});
