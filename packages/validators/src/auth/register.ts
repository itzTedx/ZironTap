import { z } from "zod";

import { emailSchema } from "../primitives";

export const registerSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "What should we call you? Please enter your name.",
		})
		.max(128, {
			message: "That name is a bit long - please keep it under 128 characters.",
		}),
	email: emailSchema,
	password: z
		.string()
		.min(8, {
			message: "Use at least 8 characters to keep your account secure.",
		})
		.max(128, {
			message: "Password can be up to 128 characters - please shorten yours a bit.",
		}),
});

export type RegisterInput = z.infer<typeof registerSchema>;
