import z from "zod";

import { eq } from "@ziron/db";
import { mediaAssets } from "@ziron/db/schema";

import { protectedProcedure } from "..";
import { dbProvider } from "../middleware";

export const uploadMedia = protectedProcedure
	.use(dbProvider)
	.input(
		z.object({
			url: z.string(),
			alt: z.string().optional(),
			width: z.number().optional(),
			height: z.number().optional(),
			filename: z.string(),
			fileSize: z.number(),
			fileType: z.string(),
			blurHash: z.string().optional(),
			storageKey: z.string(),
		})
	)
	.output(
		z.object({
			id: z.string(),
			url: z.string(),
			width: z.number().optional(),
			height: z.number().optional(),
			filename: z.string(),
			fileSize: z.number(),
			fileType: z.string(),
		})
	)

	.route({
		method: "POST",
		path: "/media/upload",
		summary: "Upload a new media",
		description: "Upload a new media with the given file",
		tags: ["media"],
	})
	.handler(async ({ context, input, errors }) => {
		const [row] = await context.db
			.insert(mediaAssets)
			.values({
				...input,
				userId: context.user.id,
			})
			.returning({
				id: mediaAssets.id,
				url: mediaAssets.url,
				width: mediaAssets.width,
				height: mediaAssets.height,
				filename: mediaAssets.filename,
				fileSize: mediaAssets.fileSize,
				fileType: mediaAssets.fileType,
			});

		if (!row) {
			throw errors.NOT_FOUND();
		}

		return {
			id: row.id,
			url: row.url,
			width: row.width ?? undefined,
			height: row.height ?? undefined,
			filename: row.filename ?? input.filename,
			fileSize: row.fileSize ?? input.fileSize,
			fileType: row.fileType ?? input.fileType,
		};
	});

export const listMedia = protectedProcedure
	.use(dbProvider)

	.output(
		z.array(
			z.object({
				id: mediaAssets.id,
				url: mediaAssets.url,
				width: mediaAssets.width,
				height: mediaAssets.height,
				filename: mediaAssets.filename,
				fileSize: mediaAssets.fileSize,
				fileType: mediaAssets.fileType,
			})
		)
	)
	.route({
		method: "POST",
		path: "/media/upload",
		summary: "Upload a new media",
		description: "Upload a new media with the given file",
		tags: ["media"],
	})
	.handler(async ({ context }) => {
		const rows = await context.db.select().from(mediaAssets).where(eq(mediaAssets.userId, context.user.id));

		return rows;
	});
