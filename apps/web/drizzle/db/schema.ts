// db/schema.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlistUsers = sqliteTable("waitlist_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});