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
				phone: "primary",
				label: "primary",
			},
		],
		emails: [
			{
				email: "test",
				label: "primary",
			},
		],
	} as z.input<typeof cardSchema>,

	validators: {
		onSubmit: cardSchema,
	},

	onSubmitInvalid() {
		const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement;

		InvalidInput?.focus();
	},
});
