import type { NextRequest } from "next/server";

import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { createContext } from "@ziron/api/context";
import { router } from "@ziron/api/routers";
import { logger } from "@ziron/logger";

const rpcHandler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			logger.error("rpc_handler_error", {
				err: error,
				path: (error as { path?: string }).path,
				code: (error as { code?: string }).code,
			});
		}),
	],
});
const apiHandler = new OpenAPIHandler(router, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			logger.error("openapi_handler_error", {
				err: error,
				path: (error as { path?: string }).path,
				code: (error as { code?: string }).code,
			});
		}),
	],
});

async function handleRequest(req: NextRequest) {
	const context = await createContext(req);

	const requestLogger = logger.child({
		requestId: req.headers.get("x-request-id") ?? crypto.randomUUID(),
		method: req.method,
		path: req.nextUrl.pathname,
	});

	requestLogger.info("rpc_request_start");

	try {
		const rpcResult = await rpcHandler.handle(req, {
			prefix: "/api/rpc",
			context,
		});
		if (rpcResult.response) {
			requestLogger.info("rpc_request_success");
			return rpcResult.response;
		}

		const apiResult = await apiHandler.handle(req, {
			prefix: "/api/rpc/docs",
			context,
		});
		if (apiResult.response) {
			requestLogger.info("openapi_request_success");
			return apiResult.response;
		}

		requestLogger.warn("rpc_route_not_found");
		return new Response("Not found", { status: 404 });
	} catch (error) {
		requestLogger.error("rpc_request_unhandled_error", { err: error });
		throw error;
	}
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
