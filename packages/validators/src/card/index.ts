import { z } from "zod";

import { orgIdSchema, userIdSchema } from "../common";
import { emailSchema, slugSchema, urlSchema, uuidSchema } from "../primitives";

export const phoneSchema = z.object({
	label: z.string().min(1, "Phone label is required.").max(32, "Phone label must be 32 characters or less."),
	phone: z
		.string()
		.min(3, "Please enter a valid phone number.")
		.max(32, "Phone number must be 32 characters or less."),
});

export type Phone = z.infer<typeof phoneSchema>;

export const LabelEnum = z.enum(["Primary", "Work", "Personal"]);
export const emailContactSchema = z.object({
	label: z.string().min(1, "Email label is required.").max(32, "Email label must be 32 characters or less."),
	email: emailSchema,
});

export type EmailContact = z.infer<typeof emailContactSchema>;

export const linkSchema = z.object({
	label: z.string().min(1, "Link label is required.").max(64, "Link label must be 64 characters or less."),
	url: urlSchema,
});

export type Link = z.infer<typeof linkSchema>;

export const appearanceSchema = z.object({
	theme: z.string().min(1, "Theme is required.").max(64, "Theme must be 64 characters or less."),
	layout: z.string().min(1, "Theme is required."),
	accentColor: z.string().min(1, "Accent color is required.").max(32, "Accent color must be 32 characters or less."),
	cardStyle: z.string().min(1, "Card style is required.").max(32, "Card style must be 32 characters or less."),
});

export type Appearance = z.infer<typeof appearanceSchema>;

export const attachmentSchema = z.object({
	id: uuidSchema,
	type: z.enum(["image", "file"]),
	url: urlSchema,
	title: z
		.string()
		.min(1, "Attachment title is required.")
		.max(128, "Attachment title must be 128 characters or less."),
});

export type Attachment = z.infer<typeof attachmentSchema>;

export const cardSchema = z.object({
	// Core card information
	id: uuidSchema.optional(),
	orgId: orgIdSchema,
	slug: slugSchema,

	name: z.string().min(1, "Name is required.").max(128, "Name must be 128 characters or less."),
	bio: z.string().max(256, "Bio must be 256 characters or less.").optional(),
	jobTitle: z.string().optional(),

	// Contact information
	phones: z.array(phoneSchema).default([]),
	emails: z.array(emailContactSchema).default([]),
	address: z.string().nullable(),
	mapUrl: z.string().nullable(),

	// Social and business links
	links: z.array(linkSchema).default([]),

	// Media and attachments
	photo: z.string().optional(),
	coverImage: z.string().optional(),
	attachments: z.array(attachmentSchema).default([]),

	// Styling and appearance
	appearance: appearanceSchema,

	// Metadata
	createdBy: userIdSchema.optional(),
	updatedBy: userIdSchema.optional(),
	version: z.number().int().min(0, "Version cannot be negative."),
});

export type Card = z.infer<typeof cardSchema>;

export const createCardSchema = cardSchema
	.omit({
		id: true,
		version: true,
	})
	.extend({
		version: z.literal(0),
	});

export type CreateCardInput = z.infer<typeof createCardSchema>;

export const updateCardSchema = cardSchema
	.pick({
		orgId: true,
		name: true,
		bio: true,
		phones: true,
		emails: true,
		links: true,
		attachments: true,
		appearance: true,
		version: true,
	})
	.extend({
		id: uuidSchema,
	});

export type UpdateCardInput = z.infer<typeof updateCardSchema>;
