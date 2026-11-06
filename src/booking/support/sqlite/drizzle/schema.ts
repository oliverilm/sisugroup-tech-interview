/**
 * SUPPORT — **rooms** table only. Candidate defines holds/bookings elsewhere.
 */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rooms = sqliteTable("rooms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  totalCapacity: integer("total_capacity").notNull(),
});

export type RoomRow = typeof rooms.$inferSelect;
