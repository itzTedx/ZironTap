import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { getPool } from "./client.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Apply all pending migrations. For CLI use run `pnpm db:migrate:run`.
 * For programmatic use: `import { runMigrations } from "@ziron/db/migrate"; await runMigrations();`
 */
export async function runMigrations(): Promise<void> {
	const pool = getPool();
	const db = drizzle(pool);
	await migrate(db, {
		migrationsFolder: path.join(__dirname, "migrations"),
	});
	await pool.end();
}

const isEntry = process.argv[1] === fileURLToPath(import.meta.url);
if (isEntry) {
	runMigrations()
		.then(() => {
			console.log("Migrations completed.");
			process.exit(0);
		})
		.catch((err) => {
			console.error("Migration failed:", err);
			process.exit(1);
		});
}
