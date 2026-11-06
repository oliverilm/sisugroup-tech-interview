/**
 * SUPPORT — verify Drizzle + TypeORM can read seeded `rooms`. Run: `npm run db:smoke`
 */
import "reflect-metadata";

import { count } from "drizzle-orm";

import { createDrizzleSqliteConnection } from "./drizzle/connection.js";
import { rooms } from "./drizzle/schema.js";
import { SEED_ROOMS } from "./room-seed-data.js";
import { seedAllSqliteRoomsOnStartup } from "./seed-rooms.js";
import { createTypeOrmSqliteDataSource } from "./typeorm/connection.js";
import { RoomEntity } from "./typeorm/entities.js";

async function main(): Promise<void> {
  const expected = SEED_ROOMS.length;

  await seedAllSqliteRoomsOnStartup();

  const d = createDrizzleSqliteConnection();
  try {
    const row = d.db.select({ n: count() }).from(rooms).get();
    const n = Number(row?.n ?? -1);
    if (n !== expected) throw new Error(`Drizzle rooms count ${n}, expected ${expected}`);
    console.log(`Drizzle OK — rooms = ${n}`);
  } finally {
    d.close();
  }

  const ds = await createTypeOrmSqliteDataSource();
  try {
    const c = await ds.getRepository(RoomEntity).count();
    if (c !== expected) throw new Error(`TypeORM rooms count ${c}, expected ${expected}`);
    console.log(`TypeORM OK — rooms = ${c}`);
  } finally {
    await ds.destroy();
  }

  console.log("Smoke test passed.");
}

void main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
