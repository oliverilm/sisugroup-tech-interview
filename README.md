# sisugroup-tech-interview

## The bookings app (what you’re building)

Each **room** has a fixed **capacity** (how many seats/units exist). Users:

- **Hold** — reserve some quantity (capacity is “soft-locked” until confirm or release).
- **Confirm** — turn a hold into a firm booking.
- **Release** — cancel a hold and free the units.

Your code must keep **totals consistent**: e.g. `available = total − held − confirmed`, never negative holds, reject over-capacity.

This repo **only** provides the **`rooms`** table + seed data. **You** add holds storage and rules (typically in [`src/index.ts`](src/index.ts)). No HTTP required.

Full candidate-facing spec: [`docs/interview/booking-capacity.md`](docs/interview/booking-capacity.md).

---

## Repo at a glance

| | |
|--|--|
| **Your code** | [`src/index.ts`](src/index.ts) (steps + scenarios in comments) |
| **Provided** | [`src/booking/support/sqlite/`](src/booking/support/sqlite/) — file SQLite DBs, **rooms** only, `npm run db:smoke` (no Docker) |

---

## Run

```bash
npm install
npm run dev                   # runs src/index.ts; initializes data/*.sqlite and seeds rooms (placeholders in git are empty until first run)
```

Optional: `npm run build && npm start`, `npm run db:smoke`.

---

## Full interview spec

See **[`docs/interview/booking-capacity.md`](docs/interview/booking-capacity.md)**.
