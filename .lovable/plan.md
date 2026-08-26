Sanity CMS integration for Neyla Production

Goal
- Add a Sanity.io headless CMS client so future content (videos, photos, team, references, pages) can be loaded from Sanity instead of static JSON.

Scope
- Install the official Sanity client SDK and image URL builder.
- Add a single reusable client config file under `src/lib/sanity.ts`.
- Leave `projectId` and `dataset` as placeholders with clear comments so the user can paste their own credentials.
- Expose a ready-to-use `sanityClient` instance and a `urlFor` helper for image URLs.
- Provide a short example GROQ query comment to guide the next migration steps.

Out of scope for this plan
- No schema changes or document types yet.
- No runtime data replacement in components.

Technical details
- Packages to install: `@sanity/client`, `@sanity/image-url`.
- Client config:
  - `projectId: "YOUR_PROJECT_ID"`
  - `dataset: "production"` (default, user-editable)
  - `apiVersion: "2024-01-01"`
  - `useCdn: true` for public read-only mode
- Add a visible TODO/comment reminding the user to update `projectId` and to add their Lovable preview + production URL as CORS origins in Sanity.
- Image helper uses `imageUrlBuilder(sanityClient)` and returns the builder chain.

Deliverables
- Updated `package.json` (or lockfile) with new dependencies.
- New file `src/lib/sanity.ts` containing the client and image helper.
