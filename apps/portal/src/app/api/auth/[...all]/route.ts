import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@ziron/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
