import { z } from "zod";

export const slugSchema = z
	.string()
	.min(1)
	.max(64)
	.regex(/^[a-z0-9-]+$/, {
		message: "Use lowercase letters, numbers, and hyphens only.",
	});

export type Slug = z.infer<typeof slugSchema>;

export const shortCodeSchema = z
	.string()
	.min(4, { message: "Short code must be at least 4 characters." })
	.max(32, { message: "Short code must be at most 32 characters." })
	.regex(/^[A-Za-z0-9_-]+$/, {
		message: "Use letters, numbers, dashes, and underscores only.",
	});

export type ShortCode = z.infer<typeof shortCodeSchema>;

export const emailSchema = z.email({ message: "Enter a valid email address." }).max(255);

export type Email = z.infer<typeof emailSchema>;

export const urlSchema = z.url({ message: "Enter a valid URL." }).max(2048);

export type Url = z.infer<typeof urlSchema>;

export const uuidSchema = z.uuid({ message: "Invalid id." });

export type Uuid = z.infer<typeof uuidSchema>;

export const paginationSchema = z.object({
	limit: z.number().int().min(1).max(100).default(20),
	cursor: z.string().nullish(),
});

export type Pagination = z.infer<typeof paginationSchema>;

export const labelEnum = z.enum(["primary", "secondary", "success", "warning", "danger"]);

export type Label = z.infer<typeof labelEnum>;
