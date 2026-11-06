# not all beige

The website of Not All Beige, Angelina Severino's interior design practice.
Built with Next.js, Tailwind CSS v4 and CSS Modules. It uses no animation library.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run lint
```

## Releases

Production is `main`, served at `www.notallbeige.com`, with `notallbeige.com` redirecting to it.

```sh
npm run ship          # push main, deploy that exact commit, verify it is live
npm run deploy:check  # read-only status
npm run test:deploy   # test the release safeguards
```

Plain Git pushes also deploy automatically, more slowly. See `AGENTS.md` for the release rules.

## Where things live

- `content/site.ts`: all copy, services, rooms, podcasts and the hero colour schemes. Start here to change words or add photographs.
- `app/globals.css`: the ten palette tokens. Change them and the whole site follows.
- `components/rooms/`: the illustration kit and the seven room drawings.
- `components/home/Hero.tsx`: the opening gag, repaintable wall and walk through the doorways.
- `public/brand/`: logo files in SVG and PNG, for dark and light backgrounds.

## Type

Titles and the logo use PP Mori Black. Body copy uses PP Mori Semibold. The stylistic
set `ss03` gives the two-storey g throughout.

## Adding photographs

Each room in `content/site.ts` has a `photos` array. Add `{ src, alt }` entries and
place the files in `public/images/`. Photographs use plain `<img>` tags, so they are
served at their original quality.
