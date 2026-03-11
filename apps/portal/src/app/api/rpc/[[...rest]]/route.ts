import type { NextRequest } from "next/server";

import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { createContext } from "@ziron/api/context";
import { router } from "@ziron/api/routers";

const rpcHandler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
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
			console.error(error);
		}),
	],
});

async function handleRequest(req: NextRequest) {
	// Create context once and reuse it for both handlers
	// This prevents duplicate session retrieval calls and ensures consistency
	// const context = await createContext(req, await headers());
	const context = await createContext(req);

	const rpcResult = await rpcHandler.handle(req, {
		prefix: "/api/rpc",
		context,
	});
	if (rpcResult.response) {
		return rpcResult.response;
	}

	const apiResult = await apiHandler.handle(req, {
		prefix: "/api/rpc/docs",
		context,
	});
	if (apiResult.response) {
		return apiResult.response;
	}

	return new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
