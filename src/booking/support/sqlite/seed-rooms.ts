/**
 * SUPPORT — create rooms table + seed rows (Drizzle + TypeORM, two SQLite files).
 */
import type { DataSource } from "typeorm";

import { createDrizzleSqliteConnection } from "./drizzle/connection.js";
import type { DrizzleDb } from "./drizzle/connection.js";
import * as schema from "./drizzle/schema.js";
import { SEED_ROOMS } from "./room-seed-data.js";
import { createTypeOrmSqliteDataSource } from "./typeorm/connection.js";
import { RoomEntity } from "./typeorm/entities.js";

export function seedRoomsDrizzle(db: DrizzleDb): void {
  for (const r of SEED_ROOMS) {
    db.insert(schema.rooms)
      .values({
        id: r.id,
        name: r.name,
        totalCapacity: r.totalCapacity,
      })
      .onConflictDoUpdate({
        target: schema.rooms.id,
        set: { name: r.name, totalCapacity: r.totalCapacity },
      })
      .run();
  }
}

export async function seedRoomsTypeOrm(ds: DataSource): Promise<void> {
  const repo = ds.getRepository(RoomEntity);
  for (const r of SEED_ROOMS) {
    await repo.upsert(
      {
        id: r.id,
        name: r.name,
        totalCapacity: r.totalCapacity,
      },
      ["id"],
    );
  }
}

/** Seeds both boilerplate DB files (idempotent). No Docker or Postgres required. */
export async function seedAllSqliteRoomsOnStartup(): Promise<void> {
  const d = createDrizzleSqliteConnection();
  try {
    seedRoomsDrizzle(d.db);
  } finally {
    d.close();
  }

  const ds = await createTypeOrmSqliteDataSource();
  try {
    await seedRoomsTypeOrm(ds);
  } finally {
    await ds.destroy();
  }
}
