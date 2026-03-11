const AUTH_PREFIX = "auth";
const ORG_PREFIX = "org";

export function namespacedKey(namespace: string, ...parts: (string | number)[]): string {
	return [namespace, ...parts].join(":");
}

export function authSessionKey(sessionId: string): string {
	return namespacedKey(AUTH_PREFIX, "session", sessionId);
}

export function authRateLimitKey(identifier: string): string {
	return namespacedKey(AUTH_PREFIX, "rate-limit", identifier);
}

export function orgScopedKey(orgId: string, ...parts: (string | number)[]): string {
	return namespacedKey(ORG_PREFIX, orgId, ...parts);
}
