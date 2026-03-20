import { createLogger, format, transports } from "winston";

import { env } from "@ziron/env/server";

const isProduction = env.NODE_ENV === "production";

const jsonFormat = format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json());

const prettyFormat = format.combine(
	format.colorize(),
	format.timestamp(),
	format.errors({ stack: true }),
	format.splat(),
	format.printf(({ level, message, timestamp, ...meta }) => {
		const metaJson = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
		return `${timestamp as string} ${level}: ${String(message)}${metaJson}`;
	})
);

export const logger = createLogger({
	level: env.LOG_LEVEL,
	format: isProduction ? jsonFormat : prettyFormat,
	defaultMeta: {
		service: "zirontap",
	},
	transports: [new transports.Console()],
});

export type Logger = typeof logger;

export type LoggerContext = {
	requestId?: string;
	userId?: string;
	orgId?: string;
	path?: string;
	method?: string;
};

export function withContext(context: LoggerContext) {
	return logger.child(context);
}
