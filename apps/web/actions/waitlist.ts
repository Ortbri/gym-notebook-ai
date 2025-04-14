// // actions/waitlist.ts
// "use server"

// import { getDB } from "@/drizzle/db";
// // import { createClient } from "@/drizzle/db";
// // import { createClient } from "@/drizzle/db/index";
// import { waitlistUsers } from "@/drizzle/db/schema";

// // Function to get Cloudflare context in development/production environments
// // async function getCloudflareContext() {
// //   try {
// //     // In production environment, this should work directly
// //     // @ts-expect-error - Runtime context access
// //     if (typeof env !== 'undefined') return { env };
    
// //     // For development with wrangler
// //     return { env: { DB: process.env.DB as unknown as D1Database } };
// //   } catch (error) {
// //     console.error('Error getting Cloudflare context:', error);
// //     return { env: {} };
// //   }
// // }

// export async function addToWaitlist(formData: FormData) {
//   const email = formData.get("email") as string;
//   console.log("email", email)

//   if (!email || typeof email !== "string") {
//     return { error: "Valid email required" };
//   }

//   try {
//     const db = getDB();

//     // const context = await getCloudflareContext();
    
//     // if (!context.env.DB) {
//     //   console.error("Database binding not found");
//     //   return { error: "Database connection error. Make sure to run with 'npm run dev:wrangler'" };
//     // }
    
//     // const lets = db.in
//     // const db = createcli({ DB: context.env.DB });
    
//     await db.insert(waitlistUsers).values({
//       email,
//       createdAt: new Date(),
//     });

//     return { success: true };
//   } catch (error) {
//     const err = error instanceof Error ? error.message : "Unknown error";
//     console.error("Error adding to waitlist:", error);
//     return { error: err };
//   }
// }