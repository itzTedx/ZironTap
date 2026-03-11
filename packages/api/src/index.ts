export * from "./base";
export * from "./context";

import { base } from "./base";
import { requireAuth } from "./middleware/require-auth";

export const publicProcedure = base;
export const protectedProcedure = publicProcedure.use(requireAuth);
