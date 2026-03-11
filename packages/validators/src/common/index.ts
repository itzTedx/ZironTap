import { z } from "zod";

import { uuidSchema } from "../primitives";

export const orgIdSchema = uuidSchema.brand<"OrgId">();

export type OrgId = z.infer<typeof orgIdSchema>;

export const userIdSchema = uuidSchema.brand<"UserId">();

export type UserId = z.infer<typeof userIdSchema>;

export const dateRangeSchema = z.object({
	from: z.coerce.date(),
	to: z.coerce.date(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;

export const listParamsSchema = z.object({
	pagination: z
		.object({
			limit: z.number().int().min(1).max(100).default(20),
			cursor: z.string().nullish(),
		})
		.default({ limit: 20, cursor: null }),
	orderBy: z.string().optional(),
});

export type ListParams = z.infer<typeof listParamsSchema>;
