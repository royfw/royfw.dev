# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical site built with **Astro 6 + Starlight + TypeScript**. Static site, dual deploy via Vercel and Docker. Content is i18n (Traditional Chinese as root locale, English at `/en/`).

## Commands

| Command           | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `npm install`     | Install dependencies                                         |
| `npm run dev`     | Dev server with hot reload at http://localhost:4321          |
| `npm run build`   | Production build to `dist/` (includes Pagefind search index) |
| `npm run preview` | Preview the built site locally                               |
| `npm run check`   | Astro type check + `tsc --noEmit`                            |
| `npm run format`  | Prettier write (js, jsx, ts, tsx, astro, md, mdx, json)      |
| `npm run lint`    | Prettier check (same file set)                               |

No test framework is configured.

## Architecture

### Stack

- **Astro** 6.x — static site generator, islands architecture
- **Starlight** 0.39 — docs theme (built-in search via Pagefind, dark mode, i18n, sidebar)
- **Sitemap** plugin with i18n awareness
- **Expressive Code** for syntax-highlighted code blocks (github-dark / github-light themes)

### Content Model

- `src/content.config.ts` defines two collections: `docs` (Starlight `docsSchema`) and `i18n` (Starlight `i18nSchema`)
- Content lives in `src/content/docs/` as `.md` or `.mdx` files with frontmatter (`title`, `description`, optional `sidebar.order`, `draft`, `badge`)
- Sidebar sections (guides, docs, notes, projects) use `autogenerate: { directory: '...' }` — new files appear automatically
- English translations go in `src/content/docs/en/` mirroring the same directory structure; Starlight auto-links matching filenames

### i18n

- Root locale = `zh-TW` (URL without prefix)
- English = `/en/...`
- Missing English pages fallback to Chinese content
- UI string overrides in `src/content/i18n/zh-TW.json` and `en.json`

### Path Aliases

`tsconfig.json` defines: `@/` → `src/`, `@components/` → `src/components/`, `@layouts/`, `@styles/`, `@assets/`

### Styling

- `src/styles/custom.css` overrides Starlight CSS custom properties (accent hue 220, CJK font stack, table responsive fix)
- Theme colors: blue accent (`#3b82f6` dark / `#2563eb` light)

### Deployment

- **Vercel**: `vercel.json` configures headers (security, `_astro/` immutable cache 1y), `cleanUrls: true`, `outputDirectory: dist`
- **Docker**: multi-stage build (node:22-alpine → nginx:1.27-alpine), custom nginx config in `docker/nginx.conf` with gzip, asset caching, HTML no-cache, Pagefind 1h cache, and SPA fallback (`try_files $uri $uri/ $uri.html /index.html`)
- **docker-compose**: exposes port 8080, healthcheck via wget

### Key Configuration File

- `astro.config.mts` — single source of truth for site metadata, sidebar, social links, edit link, Expressive Code settings, and head injections
