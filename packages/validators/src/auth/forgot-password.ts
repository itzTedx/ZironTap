import { z } from "zod/v4";

export const forgotPasswordSchema = z
	.object({
		email: z.email({ message: "Invalid email address" }),
	})
	.describe("Validates user forgot password data: valid email.");

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
