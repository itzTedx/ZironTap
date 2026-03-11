import { apiKey } from "@better-auth/api-key";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import { emailOTP } from "better-auth/plugins/email-otp";
import { organization } from "better-auth/plugins/organization";
import { twoFactor } from "better-auth/plugins/two-factor";
import { username } from "better-auth/plugins/username";

import { getCacheClient, namespacedKey } from "@ziron/cache";
import { db } from "@ziron/db";
import { env } from "@ziron/env/server";

import { ac, roles } from "./access";

/** Config ID for reviews-service API keys (embed collected reviews on external sites). */
export const REVIEWS_API_KEY_CONFIG_ID = "reviews" as const;

const AUTH_PREFIX = "auth";

export const auth = betterAuth({
	//Database.
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
	}),

	//Secondary storage.
	secondaryStorage: {
		async get(key: string) {
			const redis = getCacheClient();
			const redisKey = namespacedKey(AUTH_PREFIX, key);
			return redis.get(redisKey);
		},
		async set(key: string, value: string, ttl?: number) {
			const redis = getCacheClient();
			const redisKey = namespacedKey(AUTH_PREFIX, key);
			if (ttl) {
				await redis.set(redisKey, value, { EX: ttl });
			} else {
				await redis.set(redisKey, value);
			}
		},
		async delete(key: string) {
			const redis = getCacheClient();
			const redisKey = namespacedKey(AUTH_PREFIX, key);
			await redis.del(redisKey);
		},
	},

	//Rate limiting.
	rateLimit: {
		enabled: true,
		storage: "secondary-storage",
	},

	//Base URL and secret (Better Auth reads env vars directly).
	trustedOrigins: [env.BETTER_AUTH_URL],
	appName: "ZironTap",

	//Email and password authentication.
	emailAndPassword: {
		enabled: true,
	},

	advanced: {
		cookiePrefix: "ziron",
		useSecureCookies: env.NODE_ENV === "production",
		database: {
			generateId: false,
		},
	},

	//Plugins.
	plugins: [
		nextCookies(),
		twoFactor(),
		username(),
		emailOTP({
			async sendVerificationOTP({ type }) {
				if (type === "sign-in") {
					// TODO: send OTP for sign-in
				} else if (type === "email-verification") {
					// TODO: send OTP for email verification
				} else {
					// TODO: send OTP for password reset
				}
			},
		}),
		admin({
			ac,
			roles,
			adminRoles: ["admin", "superAdmin"],
			defaultRole: "user",
		}),
		organization({
			allowUserToCreateOrganization: true,
			organizationLimit: 10,
			membershipLimit: 100,
			creatorRole: "owner",
			defaultOrganizationIdField: "slug",
		}),
		apiKey([
			{
				configId: REVIEWS_API_KEY_CONFIG_ID,
				defaultPrefix: "zt_reviews_",
				references: "user",
				requireName: true,
				enableMetadata: true,
				permissions: {
					defaultPermissions: { reviews: ["read"] },
				},
				rateLimit: {
					enabled: true,
					timeWindow: 60 * 60 * 1000, // 1 hour
					maxRequests: 1000,
				},
				keyExpiration: {
					defaultExpiresIn: null,
					minExpiresIn: 1,
					maxExpiresIn: 365,
				},
			},
		]),
		lastLoginMethod(),
		openAPI(),
	],
	experimental: { joins: true },
});

export { ac, roles } from "./access";
