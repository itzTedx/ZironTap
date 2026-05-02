import { FieldGroup } from "@ziron/ui/components/field";

import { withForm } from "@/features/forms/hooks/use-app-form";
import { cardFormOpts } from "@/features/forms/options/cards-form-opts";

export const ProfileHero = withForm({
	...cardFormOpts,

	render: ({ form }) => {
		return (
			<>
				<form.AppField name="coverImage">
					{(field) => (
						<field.CoverUploadField
							description="or, click to browse (4MB max)"
							helperText="Recommended size: 1200 x 630"
							label="Cover Image"
						/>
					)}
				</form.AppField>

				<FieldGroup className="flex-row justify-between">
					<form.AppField name="photo">
						{(field) => (
							<field.ProfileUploadField
								description="Recommended size: 1:1, up to 2mb"
								label={{ text: "Profile Photo", srOnly: true }}
							/>
						)}
					</form.AppField>
					<form.AppField name="slug">
						{(field) => <field.SlugField label="Link" placeholder="john-doe" type="url" />}
					</form.AppField>
				</FieldGroup>
			</>
		);
	},
});
