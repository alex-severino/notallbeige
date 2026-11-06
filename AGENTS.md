<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Releases

Production is the Vercel project `notallbeige` in team `alex-severino-projects`, deployed from `main` of `github.com/alex-severino/notallbeige`, and served at `www.notallbeige.com`.

- A bare "push" means commit on `main`, push to GitHub, and deploy to Vercel. After committing on `main`, run `npm run ship`. It pushes that exact commit, replaces pending Git builds of the same commit with a cached direct Vercel deployment, and verifies the live address. Bare Git pushes still deploy automatically, more slowly.
- `npm run deploy:check` is read-only. `npm run test:deploy` tests the safeguards.
- Until DNS is connected, the script verifies on the project's `vercel.app` address and says so. It switches to `www.notallbeige.com` by itself.
- Respect "commit only" and "do not deploy". Ordinary editing is not permission to release.
- Keep media in Git at original quality. Add no storage service or lossy compression without approval.

## Design rules

- Titles and the logo are PP Mori Black. Body copy is PP Mori Semibold. Load no other weights.
- The navigation logo is lowercase at -2% tracking, on a sideways sample card. The big hero and footer logo is all caps at -3% tracking. Titles are lowercase with -2% tracking, the tightest lowercase Black takes before letters fuse.
- The logo has no fills: its enclosed spaces stay open. The big hero letters are the exception, painted to follow the wall scheme.
- Plinths are Romesco in every room.
- Colours are the ten Farrow & Ball tokens in `app/globals.css`. Add no others, and no pure black or white. Romesco is deliberately redder than Farrow & Ball's web swatch, at the user's request: the swatch looks brown next to the real paint.
- All copy and photographs live in `content/site.ts`. Never invent clients, projects, press or awards: this is a real practice, and that copy is Angelina's to supply.
- Photographs use plain `<img>` tags at original quality, not `next/image`.
