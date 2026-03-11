import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

/**
 * Access control for the admin plugin.
 * - user: no admin permissions
 * - admin: manage users (list, set-role, ban) and sessions (list, revoke); no impersonation or delete
 * - super-admin: full control including impersonation of other admins
 */
const statement = {
	...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

/** Default role; no admin operations. */
export const user = ac.newRole({
	user: [],
	session: [],
});

/** Org support / staff: list users, change roles, ban; manage sessions. No impersonation or user delete. */
export const admin = ac.newRole({
	user: ["list", "set-role", "ban", "update"],
	session: ["list", "revoke"],
});

/** Full app admin: all permissions including impersonate and impersonate other admins. */
export const superAdmin = ac.newRole({
	...adminAc.statements,
	user: ["impersonate-admins", ...adminAc.statements.user],
});

export const roles = { user, admin, superAdmin } as const;
