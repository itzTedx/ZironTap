import { z } from "zod";

import { orgIdSchema } from "../common";
import { shortCodeSchema, urlSchema, uuidSchema } from "../primitives";

export const createShortLinkSchema = z.object({
	organizationId: orgIdSchema,
	shortCode: shortCodeSchema,
	targetUrl: urlSchema,
	title: z.string().min(1).max(128).optional(),
});

export type CreateShortLinkInput = z.infer<typeof createShortLinkSchema>;

export const updateShortLinkSchema = createShortLinkSchema
	.pick({
		shortCode: true,
		targetUrl: true,
		title: true,
	})
	.extend({
		id: uuidSchema,
		organizationId: orgIdSchema,
		version: z.number().int().min(0),
	});

export type UpdateShortLinkInput = z.infer<typeof updateShortLinkSchema>;

export const redirectShortLinkParamsSchema = z.object({
	shortCode: shortCodeSchema,
});

export type RedirectShortLinkParams = z.infer<typeof redirectShortLinkParamsSchema>;
