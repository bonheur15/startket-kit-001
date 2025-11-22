import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, varchar, int, unique, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const account = mysqlTable("account", {
	userId: varchar({ length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: varchar({ length: 255 }).notNull(),
	provider: varchar({ length: 255 }).notNull(),
	providerAccountId: varchar({ length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: text("access_token"),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar({ length: 255 }),
	idToken: varchar("id_token", { length: 2048 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => [
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId"}),
]);

export const authenticator = mysqlTable("authenticator", {
	credentialId: varchar({ length: 255 }).notNull(),
	userId: varchar({ length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	providerAccountId: varchar({ length: 255 }).notNull(),
	credentialPublicKey: varchar({ length: 255 }).notNull(),
	counter: int().notNull(),
	credentialDeviceType: varchar({ length: 255 }).notNull(),
	credentialBackedUp: int().notNull(),
	transports: varchar({ length: 255 }),
},
(table) => [
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = mysqlTable("session", {
	sessionToken: varchar({ length: 255 }).notNull(),
	userId: varchar({ length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp({ mode: 'string' }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.sessionToken], name: "session_sessionToken"}),
]);

export const user = mysqlTable("user", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	emailVerified: timestamp({ fsp: 3, mode: 'string' }),
	image: varchar({ length: 255 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "user_id"}),
	unique("user_email_unique").on(table.email),
]);

export const verificationToken = mysqlTable("verification_token", {
	identifier: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 255 }).notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.identifier, table.token], name: "verification_token_identifier_token"}),
]);
