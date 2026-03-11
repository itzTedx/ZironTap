import { z } from "zod";

import { orgIdSchema, userIdSchema } from "../common";
import { emailSchema, slugSchema, urlSchema, uuidSchema } from "../primitives";

export const phoneSchema = z.object({
	label: z.string().min(1).max(32),
	value: z.string().min(3).max(32),
});

export type Phone = z.infer<typeof phoneSchema>;

export const emailContactSchema = z.object({
	label: z.string().min(1).max(32),
	value: emailSchema,
});

export type EmailContact = z.infer<typeof emailContactSchema>;

export const linkSchema = z.object({
	label: z.string().min(1).max(64),
	url: urlSchema,
});

export type Link = z.infer<typeof linkSchema>;

export const appearanceSchema = z.object({
	theme: z.string().min(1).max(64),
	accentColor: z.string().min(1).max(32),
	cardStyle: z.string().min(1).max(32),
});

export type Appearance = z.infer<typeof appearanceSchema>;

export const attachmentSchema = z.object({
	id: uuidSchema,
	type: z.enum(["image", "file"]),
	url: urlSchema,
	title: z.string().min(1).max(128),
});

export type Attachment = z.infer<typeof attachmentSchema>;

export const cardBaseSchema = z.object({
	id: uuidSchema,
	organizationId: orgIdSchema,
	slug: slugSchema,
	title: z.string().min(1).max(128),
	subtitle: z.string().max(256).optional(),
	description: z.string().max(1024).optional(),
	phones: z.array(phoneSchema).default([]),
	emails: z.array(emailContactSchema).default([]),
	links: z.array(linkSchema).default([]),
	attachments: z.array(attachmentSchema).default([]),
	appearance: appearanceSchema,
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	createdBy: userIdSchema.optional(),
	updatedBy: userIdSchema.optional(),
	version: z.number().int().min(0),
});

export type Card = z.infer<typeof cardBaseSchema>;

export const createCardSchema = cardBaseSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
		version: true,
	})
	.extend({
		version: z.literal(0),
	});

export type CreateCardInput = z.infer<typeof createCardSchema>;

export const updateCardSchema = cardBaseSchema.pick({
	id: true,
	organizationId: true,
	title: true,
	subtitle: true,
	description: true,
	phones: true,
	emails: true,
	links: true,
	attachments: true,
	appearance: true,
	version: true,
});

export type UpdateCardInput = z.infer<typeof updateCardSchema>;
