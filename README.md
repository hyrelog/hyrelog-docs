# hyrelog-docs

Customer-facing HyreLog Help Center built with Next.js + Fumadocs.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route structure

Docs are served from root paths (no `/docs` prefix), for example:

- `/`
- `/getting-started/create-your-account`
- `/guides/manage-api-keys`
- `/api/reference`
- `/api/endpoints/health-check`

Legacy `/docs/*` links are redirected to root equivalents via `next.config.mjs`.

## Deployment (Vercel + GitHub)

This project is intended for standard Next.js deployment on Vercel (not static export mode).

1. Push to GitHub.
2. Connect repo to Vercel.
3. Use default Next.js build settings.
4. Set environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://your-docs-domain.com`

`metadataBase` is sourced from `NEXT_PUBLIC_SITE_URL` in `app/layout.tsx`.

## Notes

- OpenAPI source (live): [https://api.hyrelog.com/openapi.json](https://api.hyrelog.com/openapi.json) — generated at deploy from tagged `/v1/*` routes only; `/dashboard/*` is excluded.
- Optional static snapshot (sibling repo): `../docs/api-reference/openapi.json` — refresh with `curl -sS https://api.hyrelog.com/openapi.json -o ../docs/api-reference/openapi.json`
- Docs content lives in `content/docs`.
- Docs sidebar grouping is controlled by `meta.json` files in each docs folder.
- **Dashboard** product guides live under `content/docs/dashboard/` (May 2026 production update documented in `content/docs/release-notes/`).
