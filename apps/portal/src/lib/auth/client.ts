import { apiKeyClient } from "@better-auth/api-key/client";
import { passkeyClient } from "@better-auth/passkey/client";
import { ac, roles } from "@ziron/auth";
import { createAuthClient } from "better-auth/client";
import {
	adminClient,
	emailOTPClient,
	lastLoginMethodClient,
	organizationClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
	plugins: [
		usernameClient(),
		emailOTPClient(),
		twoFactorClient(),
		passkeyClient(),
		adminClient({
			ac,
			roles,
		}),
		organizationClient(),
		apiKeyClient(),
		lastLoginMethodClient(),
	],
});
