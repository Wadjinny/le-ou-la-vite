# Le ou La

French noun gender lookup — type a word and see whether it takes **le** or **la**. Fuzzy search over a local word list; everything runs in the browser.

**Live:** [le-ou-la.w-ilyas.site](https://le-ou-la.w-ilyas.site)

## Features

- Fuzzy search (Fuse.js) over French nouns
- Shows the definite article from gender
- Optional `?word=` URL param; dark/light theme

## Stack

pnpm, Vite, React 19, React Router, Fuse.js, Tailwind CSS 4.

## Run locally

```bash
cd frontend
pnpm install
pnpm dev
```

## Deploy

Push to `main` builds the Vite app and deploys over SSH, then reloads the Caddy site config.
