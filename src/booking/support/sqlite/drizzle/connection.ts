/**
 * SUPPORT — Drizzle + better-sqlite3 (single file DB).
 */
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "node:fs";
import path from "node:path";

import * as schema from "./schema.js";

const DEFAULT_DB_FILE = path.resolve(process.cwd(), "data", "booking-drizzle.sqlite");

export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

export function createDrizzleSqliteConnection(dbFile: string = DEFAULT_DB_FILE): {
  sqlite: Database.Database;
  db: DrizzleDb;
  close: () => void;
} {
  const abs = path.resolve(dbFile);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  const sqlite = new Database(abs);
  ensureDrizzleRoomsTable(sqlite);
  const db = drizzle(sqlite, { schema });

  return {
    sqlite,
    db,
    close: () => sqlite.close(),
  };
}

export function ensureDrizzleRoomsTable(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      total_capacity INTEGER NOT NULL
    );
  `);
}
