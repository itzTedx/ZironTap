import { z } from "zod";

import { orgIdSchema } from "../common";
import { slugSchema, uuidSchema } from "../primitives";

export const reviewCardSchema = z.object({
	id: uuidSchema,
	organizationId: orgIdSchema,
	slug: slugSchema,
	title: z.string().min(1).max(128),
	description: z.string().max(512).optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type ReviewCard = z.infer<typeof reviewCardSchema>;

export const createReviewSubmissionSchema = z.object({
	cardId: uuidSchema,
	rating: z.number().int().min(1).max(5),
	authorName: z.string().min(1).max(128).optional(),
	comment: z.string().max(1024).optional(),
});

export type CreateReviewSubmissionInput = z.infer<typeof createReviewSubmissionSchema>;
