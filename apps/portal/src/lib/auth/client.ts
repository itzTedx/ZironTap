import { apiKeyClient } from "@better-auth/api-key/client";
import { passkeyClient } from "@better-auth/passkey/client";
import {
	adminClient,
	emailOTPClient,
	lastLoginMethodClient,
	organizationClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, roles } from "@ziron/auth/client";

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

export const { signIn, signUp, signOut, useSession, useActiveOrganization, useListOrganizations, twoFactor } =
	authClient;
