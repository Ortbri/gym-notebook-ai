import { defineConfig } from "drizzle-kit";
import * as fs from "node:fs";
import path from "node:path";

function getLocalD1DB() {
    try {
        const basePath = path.resolve(".wrangler/state/v3/d1")
        const dbFile = fs.readdirSync(basePath, {encoding: "utf-8", recursive: true}).find((f) => f.endsWith('.sqlite'))

        if (!dbFile) {
            throw new Error('.sqlite file not found')
        }

        const url = path.resolve(basePath, dbFile)
        return url;
    } catch (e) {
        console.error(`Error ${e}`)
        return null;
    }
}

export default defineConfig({
    dialect: 'sqlite',
    schema: './drizzle/db/schema.ts',
    out: './drizzle/migrations',
    ...(process.env.NODE_ENV === 'production' ? {
        driver: 'd1-http', dbCredentials: {
            accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
            databaseId: process.env.CLOUDFLARE_DATABASE_ID,
            token: process.env.CLOUDFLARE_D1_API_TOKEN
        }
    } : {
        dbCredentials: {
            url: getLocalD1DB()
        }
    })
})
// import { defineConfig } from 'drizzle-kit';
// import fs from "node:fs";
// import path from "node:path";

// function getLocalD1DB() {
//   try {
//     const basePath = path.resolve(".wrangler/state/v3/d1");
//     const dbFile = fs
//       .readdirSync(basePath, { encoding: "utf-8", recursive: true })
//       .find((f) => f.endsWith(".sqlite"));

//     if (!dbFile) {
//       throw new Error(`.sqlite file not found in ${basePath}`);
//     }

//     const url = path.resolve(basePath, dbFile);
//     return url;
//   } catch (err) {
//     console.error(err)

//     return null;
//   }
// }

// export default defineConfig({
//   out: './drizzle/migrations',
//   schema: './drizzle/db/schema.ts',
//   dialect: 'sqlite',
//   ...(process.env.NODE_ENV === "production"
//     ? {
//       driver: "d1-http",
//       dbCredentials: {
//         accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
//         databaseId: process.env.DATABASE_ID,
//         token: process.env.CLOUDFLARE_API_TOKEN,
//       },
//     }
//     : {
//       dbCredentials: {
//         url: getLocalD1DB(),
//       },
//     }),
// });