import { z } from "zod";

import { emailSchema, urlSchema } from "../primitives";

export const qrTypeSchema = z.enum(["url", "vcard", "wifi"]);

export type QrType = z.infer<typeof qrTypeSchema>;

export const qrPayloadSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("url"),
		url: urlSchema,
	}),
	z.object({
		type: z.literal("vcard"),
		fullName: z.string().min(1).max(128),
		email: emailSchema.optional(),
		phone: z.string().optional(),
	}),
	z.object({
		type: z.literal("wifi"),
		ssid: z.string().min(1).max(64),
		password: z.string().max(64).optional(),
		security: z.enum(["WPA", "WEP", "nopass"]).default("WPA"),
	}),
]);

export type QrPayload = z.infer<typeof qrPayloadSchema>;

export const qrCustomizationSchema = z.object({
	color: z.string().default("#000000"),
	backgroundColor: z.string().default("#ffffff"),
	logoUrl: urlSchema.optional(),
});

export type QrCustomization = z.infer<typeof qrCustomizationSchema>;
