import { os } from "@orpc/server";

export interface ORPCContext {
	request: Request;
}

export const base = os.$context<ORPCContext>().errors({
	UNAUTHORIZED: {
		message: "Sign in to continue - we'll have everything ready for you.",
		status: 401,
	},
	FORBIDDEN: {
		message: "You don't have permission for this. Your admin can help if you need access.",
		status: 403,
	},
	NOT_FOUND: {
		message: "We couldn't find this. It may have been moved or deleted.",
		status: 404,
	},
	BAD_REQUEST: {
		message: "Something went wrong on our end. Please try again.",
		status: 400,
	},
	CONFLICT: {
		message: "This name or link is already taken. Try something different?",
		status: 409,
	},
	PRECONDITION_FAILED: {
		message: "You've reached your plan limit. Upgrade to keep creating!",
		status: 412,
	},
	TOO_MANY_REQUESTS: {
		message: "Please wait a moment and try again.",
		status: 429,
	},
	PAYLOAD_TOO_LARGE: {
		message: "This file is too large. Try a smaller one?",
		status: 413,
	},
	UNSUPPORTED_MEDIA_TYPE: {
		message: "We accept JPG, PNG, and WebP. That format won't work here.",
		status: 415,
	},
	UNPROCESSABLE_CONTENT: {
		message: "Something doesn't look right. Please check and try again.",
		status: 422,
	},
});
