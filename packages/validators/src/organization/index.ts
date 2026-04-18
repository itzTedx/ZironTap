import { z } from "zod/v4";

export const createOrganizationSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		slug: z.string().optional(),
		logo: z.string().min(1, { message: "Logo is required" }),
		website: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().optional(),
		address: z.string().optional(),
	})
	.describe("Validates organization creation data: name, slug, logo, website, phone, email, address.");

export type CreateOrganizationType = z.infer<typeof createOrganizationSchema>;
