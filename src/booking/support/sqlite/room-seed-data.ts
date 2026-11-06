/**
 * SUPPORT — canonical list of rooms loaded into SQLite on startup (see `seed-rooms.ts`).
 */
import type { SupportRoom } from "./types.js";

export const SEED_ROOMS: readonly SupportRoom[] = [
  { id: "room-alpha", name: "Conference A", totalCapacity: 20 },
  { id: "room-beta", name: "Conference B", totalCapacity: 12 },
  { id: "room-gamma", name: "Huddle 3", totalCapacity: 6 },
  { id: "room-delta", name: "Boardroom", totalCapacity: 8 },
  { id: "room-epsilon", name: "Training Lab", totalCapacity: 24 },
  { id: "room-zeta", name: "Phone Booth 1", totalCapacity: 1 },
  { id: "room-eta", name: "Phone Booth 2", totalCapacity: 1 },
  { id: "room-theta", name: "Town Hall", totalCapacity: 40 },
  { id: "room-iota", name: "Quiet Pod 4", totalCapacity: 4 },
  { id: "room-kappa", name: "Workshop Space", totalCapacity: 16 },
];
