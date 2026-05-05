import { formOptions } from "@tanstack/react-form-nextjs";

import { cardSchema, z } from "@ziron/validators";

export const cardFormOpts = formOptions({
	defaultValues: {
		name: "",
		slug: "",
		coverImage: "",
		photo: "",
		bio: "",
		orgId: "",
		jobTitle: "",
		address: "",
		mapUrl: "",
		phones: [
			{
				phone: "",
				label: "primary",
			},
		],
		emails: [
			{
				email: "",
				label: "primary",
			},
		],
		appearance: {
			theme: "dark",
			layout: "default",
			accentColor: "red",
			cardStyle: "default",
		},
		version: 1,
	} as z.input<typeof cardSchema>,

	validators: {
		onChange: cardSchema,
	},

	onSubmitInvalid({ formApi }) {
		const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement;
		console.log("Invalid", formApi.getAllErrors());
		InvalidInput?.focus();
	},
});
