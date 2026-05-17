# personal-site

Source for [jamesmensch.com](https://jamesmensch.com/): a single-page vCard landing plus a long-form writing index at `/writing`.

Built on Astro (forked from [satnaing/astro-paper](https://github.com/satnaing/astro-paper)) with a SpenschSuite theme override (Nunito, parchment background, warm-brown ink scale). Deployed to Cloudflare Pages on every push to `main`.

## Routes

| Path              | What                                                    |
| ----------------- | ------------------------------------------------------- |
| `/`               | vCard landing (name, blurb, contact links, Writing CTA) |
| `/writing`        | Post index                                              |
| `/writing/[slug]` | Individual post                                         |
| `/search`         | Pagefind-powered full-text search                       |
| `/rss.xml`        | RSS feed                                                |

`blog.thespenschs.com` 301-redirects to `https://jamesmensch.com/writing` via `functions/_middleware.js` (Cloudflare Pages Function). The redirect points at the writing root rather than a per-slug map because no posts were live before the domain change, so there were no inbound deep links to preserve. If real deep links appear later, switch to a slug map in the middleware.

## Stack

- **Framework:** Astro 5
- **Styling:** Tailwind v4 + custom SpenschSuite tokens
- **Font:** Nunito (400/500/600/700/800), self-hosted via Astro fonts
- **Search:** Pagefind (built at `pnpm build` time)
- **Deploy:** Cloudflare Pages (apex + www, HTTPS, IPv6)
- **Linting:** ESLint + Prettier + `astro check`

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # production build into ./dist (also generates Pagefind index)
pnpm preview        # serve ./dist locally
pnpm format         # prettier write
pnpm lint           # eslint
```

## Posts

Markdown posts live in `src/data/blog/*.md`. Frontmatter schema is defined in `src/content.config.ts`.

A post needs at minimum:

```md
---
title: "Post title"
description: "One-line description for OG card and feed"
pubDatetime: 2026-05-17T10:00:00Z
draft: false
---
```

Set `draft: true` to keep a post out of the built site.

## Style

No em dashes in user-facing copy. Use commas, semicolons, parentheses, or rewrite. En dashes are fine for ranges. See the home-lab `feedback_no_emdashes` memory for context.

## License

MIT (see `LICENSE`). Theme upstream is [astro-paper](https://github.com/satnaing/astro-paper) by Sat Naing, also MIT.
