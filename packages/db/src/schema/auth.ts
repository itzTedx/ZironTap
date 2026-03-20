import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { id, timestamps } from "./columns";

export const users = pgTable(
	"users",
	{
		id: id(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		emailVerified: boolean("email_verified").default(false).notNull(),
		image: text("image"),
		twoFactorEnabled: boolean("two_factor_enabled").default(false),
		username: text("username").unique(),
		displayUsername: text("display_username"),
		role: text("role"),
		banned: boolean("banned").default(false),
		banReason: text("ban_reason"),
		banExpires: timestamp("ban_expires"),
		...timestamps(),
	},
	(table) => [index("users_email_idx").on(table.email), index("users_username_idx").on(table.username)]
);

export const accounts = pgTable(
	"accounts",
	{
		id: id(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		...timestamps(),
	},
	(table) => [index("accounts_userId_idx").on(table.userId)]
);

export const verifications = pgTable(
	"verifications",
	{
		id: id(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		...timestamps(),
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)]
);

export const twoFactors = pgTable(
	"two_factors",
	{
		id: id(),
		secret: text("secret").notNull(),
		backupCodes: text("backup_codes").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(table) => [index("twoFactors_secret_idx").on(table.secret), index("twoFactors_userId_idx").on(table.userId)]
);

export const passkeys = pgTable(
	"passkeys",
	{
		id: id(),
		name: text("name"),
		publicKey: text("public_key").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		credentialID: text("credential_id").notNull(),
		counter: integer("counter").notNull(),
		deviceType: text("device_type").notNull(),
		backedUp: boolean("backed_up").notNull(),
		transports: text("transports"),
		createdAt: timestamp("created_at"),
		aaguid: text("aaguid"),
	},
	(table) => [
		index("passkeys_userId_idx").on(table.userId),
		index("passkeys_credentialID_idx").on(table.credentialID),
	]
);

export const organizations = pgTable(
	"organizations",
	{
		id: id(),
		name: text("name").notNull(),
		slug: text("slug").notNull().unique(),
		logo: text("logo"),
		createdAt: timestamp("created_at").notNull(),
		metadata: text("metadata"),
	},
	(table) => [uniqueIndex("organizations_slug_uidx").on(table.slug)]
);

export const members = pgTable(
	"members",
	{
		id: id(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").default("member").notNull(),
		createdAt: timestamp("created_at").notNull(),
	},
	(table) => [
		index("members_organizationId_idx").on(table.organizationId),
		index("members_userId_idx").on(table.userId),
	]
);

export const invitations = pgTable(
	"invitations",
	{
		id: id(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		email: text("email").notNull(),
		role: text("role"),
		status: text("status").default("pending").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		...timestamps(),
		inviterId: uuid("inviter_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("invitations_organizationId_idx").on(table.organizationId),
		index("invitations_email_idx").on(table.email),
	]
);

export const apikeys = pgTable(
	"apikeys",
	{
		id: id(),
		configId: text("config_id").default("default").notNull(),
		name: text("name"),
		start: text("start"),
		referenceId: text("reference_id").notNull(),
		prefix: text("prefix"),
		key: text("key").notNull(),
		refillInterval: integer("refill_interval"),
		refillAmount: integer("refill_amount"),
		lastRefillAt: timestamp("last_refill_at"),
		enabled: boolean("enabled").default(true),
		rateLimitEnabled: boolean("rate_limit_enabled").default(true),
		rateLimitTimeWindow: integer("rate_limit_time_window").default(3600000),
		rateLimitMax: integer("rate_limit_max").default(1000),
		requestCount: integer("request_count").default(0),
		remaining: integer("remaining"),
		lastRequest: timestamp("last_request"),
		expiresAt: timestamp("expires_at"),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at").notNull(),
		permissions: text("permissions"),
		metadata: text("metadata"),
	},
	(table) => [
		index("apikeys_configId_idx").on(table.configId),
		index("apikeys_referenceId_idx").on(table.referenceId),
		index("apikeys_key_idx").on(table.key),
	]
);

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	twoFactors: many(twoFactors),
	passkeys: many(passkeys),
	members: many(members),
	invitations: many(invitations),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	users: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));

export const passkeysRelations = relations(passkeys, ({ one }) => ({
	users: one(users, {
		fields: [passkeys.userId],
		references: [users.id],
	}),
}));

export const twoFactorsRelations = relations(twoFactors, ({ one }) => ({
	users: one(users, {
		fields: [twoFactors.userId],
		references: [users.id],
	}),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
	members: many(members),
	invitations: many(invitations),
}));

export const membersRelations = relations(members, ({ one }) => ({
	organizations: one(organizations, {
		fields: [members.organizationId],
		references: [organizations.id],
	}),
	users: one(users, {
		fields: [members.userId],
		references: [users.id],
	}),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
	organizations: one(organizations, {
		fields: [invitations.organizationId],
		references: [organizations.id],
	}),
	users: one(users, {
		fields: [invitations.inviterId],
		references: [users.id],
	}),
}));
