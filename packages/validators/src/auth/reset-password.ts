import { z } from "zod/v4";

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.describe("Validates user reset password data: valid password and confirm password.");

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
