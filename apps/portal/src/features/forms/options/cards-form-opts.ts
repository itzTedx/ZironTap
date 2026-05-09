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
		links: [
			{
				order: 0,
				label: "Instagram",
				url: "https://instagram.com/zironpro",
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
		onChangeAsync: cardSchema,
		onChangeAsyncDebounceMs: 1000,
	},
});
