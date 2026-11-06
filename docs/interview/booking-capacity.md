# Resource booking with capacity

## What you build

Model **shared resources** with a fixed capacity **N** per room (e.g. seats, licenses). Callers place **holds**, then **confirm** or **release** them. **Totals must stay consistent** with the rules below.

**Stack:** TypeScript. **No HTTP required.**

**Where your code lives:** everything you add for the exercise goes in **`src/index.ts`** (that file already has steps and comments to follow). There are no hidden stubs elsewhere.

---

## Repository (provided for you)

- **`src/booking/support/sqlite/`** — two database paths under **`data/`** (`booking-drizzle.sqlite` and `booking-typeorm.sqlite`). Empty **0-byte** placeholders are **committed** so the paths exist in git; the first **`npm run dev`** or **`npm run db:smoke`** initializes SQLite on disk and seeds **`rooms`**. No database server or Docker.

Support gives you **room inventory** only (`SEED_ROOMS`). You design and implement **holds** storage (and any schema) yourself. You may use **either** TypeORM **or** Drizzle for your solution, reusing the support entry points if helpful:

| | |
|--|--|
| TypeORM | `createTypeOrmSqliteDataSource()` in `support/sqlite/typeorm/connection.ts` |
| Drizzle | `createDrizzleSqliteConnection()` in `support/sqlite/drizzle/connection.ts` |

`src/index.ts` runs **`seedAllSqliteRoomsOnStartup()`** on startup (support only). `drizzle.config.ts` points at the support Drizzle schema for **rooms** only.

---

## Domain

| Action | Meaning |
|--------|---------|
| **Hold** | Reserve a **quantity** until it is confirmed, released, or (if you implement it) expired. |
| **Confirm** | Turn an open hold into **committed** capacity naming and status are yours as long as they are consistent. |
| **Release** | Cancel an open hold and return its quantity to **available** capacity. |

---

## Capacity (single source of truth)

For each room:

- **`total`** — fixed capacity **N** for that room (from your read of `rooms` / seed data).
- **`confirmed`** — sum of quantities that are **committed** (after confirm, until you model otherwise).
- **`held`** — sum of quantities in **open** holds (not yet confirmed or released).
- **`available`** = `total − held − confirmed` — **must never be negative**.

A **new hold** is allowed only if **`quantity ≤ available`**. If a hold would exceed capacity, **reject it** and **leave stored state unchanged** (no partial updates).

---

## What you must implement

1. **Hold** — Reserve a positive integer quantity for a known room; receive or generate a **hold identifier** your other operations can use.
2. **Observe capacity** — For a room, report **total**, **held**, **confirmed**, and **available** (or an equivalent snapshot) consistent with the definitions above.
3. **Confirm** — Turn an **open** hold into committed capacity; invalid or unknown hold must fail safely.
4. **Release** — Cancel an **open** hold and free its quantity; invalid or unknown hold must fail safely.
5. **Validation** — Reject nonsensical input (e.g. non-positive quantity, unknown room, wrong hold for the room) without corrupting totals.
6. **Persistence** — Store holds (and any other state you need) so that **restarting the process** does not lose bookings and totals remain correct.
7. **Demo** — Wire enough behaviour in **`main()`** (or equivalent in `src/index.ts`) so that **`npm run dev`** shows real output for the flows you implement.

Names, types, and internal layout are **yours**. The file `src/index.ts` lists **example scenarios** in comments; use whichever subset you actually build, as far as time allows.

---

## Notes

If you use TypeORM decorators at runtime, keep **`import "reflect-metadata"`** at the top of `src/index.ts` (it is already there).
