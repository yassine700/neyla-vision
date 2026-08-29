# Cloudflare Workers Static Hosting & SPA Routing

Prepare the project for deployment as a static-assets Worker with client-side SPA routing so deep links like `/studio` and `/team` load correctly.

## Changes

1. **Create `wrangler.toml`** (project root):

```toml
name = "neyla-production"
compatibility_date = "2026-08-28"

[assets]
directory = "./dist"
binding = "ASSETS"
html_handling = "single-page-app"
not_found_handling = "single-page-app"
```

This serves everything in `dist` as static assets and falls back to `index.html` for unknown routes so TanStack Router handles them client-side.

2. **Update `package.json` scripts** — add:

```json
"deploy": "vite build && wrangler deploy"
```

3. **Vite base path** — set `base: '/'` in `vite.config.ts` via the existing `defineConfig` `vite` passthrough, so all asset URLs are root-relative and resolve correctly on deep routes (`/studio`, `/team`, `/nos-realisations`, etc.) when served by the Worker.

## Notes

- The current build already targets Cloudflare via nitro (per the vite.config.ts header comment). The `wrangler.toml` + SPA asset handling makes the static hosting and client-side fallback explicit for direct `wrangler deploy` usage.
- `wrangler` must be authenticated (`wrangler login` or `CLOUDFLARE_API_TOKEN`) when running `npm run deploy`; deployment itself is done from the user's machine/CI, not the preview sandbox.
- No app code changes are needed — routing is already file-based TanStack Router with root-relative asset imports.
