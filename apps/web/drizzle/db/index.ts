// import { drizzle } from "drizzle-orm/d1";
// import { waitlistUsers } from './schema';

// // Database client for both development and production
// export function createClient() {
//   if (!process.env.DB) {
//     throw new Error('DB is not defined');
//   }
//   return drizzle(process.env.DB as unknown as D1Database, { schema: { waitlistUsers } });
// }

// export { waitlistUsers };



import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export let db: DrizzleD1Database<typeof schema> | null = null;

export const getDB = () => {
  if (db) {
    return db;
  }

  const { env } = getCloudflareContext();

  if (!env.DB) {
    throw new Error("D1 database not found");
  }

  db = drizzle(env.DB as unknown as D1Database, { schema, logger: true });

  return db;
};
