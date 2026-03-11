// Barrel for type-checking; package entry points are @ziron/env/server and @ziron/env/web

export { env as nativeEnv } from "./native.js";
export { env } from "./server.js";
export { env as webEnv } from "./web.js";
