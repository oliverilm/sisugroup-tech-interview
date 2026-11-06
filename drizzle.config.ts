import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/booking/support/sqlite/drizzle/schema.ts",
  out: "./src/booking/support/sqlite/drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./data/booking-drizzle.sqlite",
  },
});
