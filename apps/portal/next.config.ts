import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@ziron/ui", "@ziron/auth", "@ziron/api", "@ziron/db", "@ziron/env"],
	/* config options here */
	typedRoutes: true,
	reactCompiler: true,

	// Performance optimizations
	experimental: {
		// Enable filesystem caching for `next dev`
		turbopackFileSystemCacheForDev: true,
		// Enable filesystem caching for `next build`
		turbopackFileSystemCacheForBuild: true,
	},
};

export default nextConfig;
