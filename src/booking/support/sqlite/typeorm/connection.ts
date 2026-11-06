/**
 * SUPPORT — TypeORM + better-sqlite3 (separate file from Drizzle smoke path).
 */
import fs from "node:fs";
import path from "node:path";

import { DataSource } from "typeorm";

import { RoomEntity } from "./entities.js";

const ENTITIES = [RoomEntity];

const DEFAULT_DB_FILE = path.resolve(process.cwd(), "data", "booking-typeorm.sqlite");

export async function createTypeOrmSqliteDataSource(
  dbFile: string = DEFAULT_DB_FILE,
): Promise<DataSource> {
  const abs = path.resolve(dbFile);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  const ds = new DataSource({
    type: "better-sqlite3",
    database: abs,
    entities: ENTITIES,
    synchronize: true,
    logging: false,
  });

  await ds.initialize();
  return ds;
}
