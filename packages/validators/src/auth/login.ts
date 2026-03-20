import { z } from "zod/v4";

export const loginSchema = z
	.object({
		email: z.email({ message: "Invalid email address" }),
		password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
	})
	.describe("Validates user login data: valid email, and password (min 4 chars).");

export type LoginType = z.infer<typeof loginSchema>;
