/** Entry — `reflect-metadata` is required if you use TypeORM decorators at runtime. */
import "reflect-metadata";

import { seedAllSqliteRoomsOnStartup } from "./booking/support/sqlite/seed-rooms.js";

/* ═══════════════════════════════════════════════════════════════════════════
 * Implement these five behaviours (names and signatures are up to you):
 *
 * 1. **Create a hold** — Given a room id and a positive quantity, reserve that
 *    many units if capacity allows; return a hold id (or reject without changing state).
 *
 * 2. **Rooms that fit N people** — Given N, return which rooms have **at least N**
 *    available units right now (same `available` rule as the spec: total − held − confirmed).
 *
 * 3. **Capacity snapshot** — For a room, return total, held, confirmed, and available
 *    so a caller can see current state.
 *
 * 4. **Confirm a hold** — Turn an open hold into committed booking; reject unknown,
 *    already processed, or invalid holds.
 *
 * 5. **Release a hold** — Cancel an open hold and free its quantity; reject invalid holds.
 *
 * Wire demonstrations in `main()` as you go (console output is enough).
 * Full rules: `docs/interview/booking-capacity.md`.
 * ═══════════════════════════════════════════════════════════════════════════ */

async function main(): Promise<void> {
  await seedAllSqliteRoomsOnStartup();
}

void main();
