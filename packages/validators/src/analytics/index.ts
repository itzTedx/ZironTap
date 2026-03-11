import { z } from "zod";

import { dateRangeSchema, orgIdSchema } from "../common";
import { uuidSchema } from "../primitives";

export const analyticsEventTypeSchema = z.enum(["card_view", "link_click", "qr_scan", "review_submitted"]);

export type AnalyticsEventType = z.infer<typeof analyticsEventTypeSchema>;

export const analyticsEventSchema = z.object({
	id: uuidSchema,
	organizationId: orgIdSchema,
	type: analyticsEventTypeSchema,
	source: z.string().optional(),
	createdAt: z.coerce.date(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const analyticsQuerySchema = z.object({
	organizationId: orgIdSchema,
	dateRange: dateRangeSchema,
	eventTypes: z.array(analyticsEventTypeSchema).optional(),
});

export type AnalyticsQueryInput = z.infer<typeof analyticsQuerySchema>;
