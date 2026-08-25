# Neyla Production — site vitrine (dark luxury)

Redesign inspired by the ndfilms.ma structure, with Neyla's black/white/red identity, built as a single scrolling home page with dedicated section anchors plus separate routes for SEO-relevant pages.

## Design system

- Palette: near-black `#0A0A0A` background, white text, accent red `#E50914` (hover `#DC2626`), muted grays for secondary text.
- Typography: bold condensed display headings, clean sans body; generous uppercase tracking on section labels.
- Motion: Framer Motion (`motion` package) for scroll-reveal, staggered grids, and subtle parallax. Lucide React for icons.
- Tokens go into `src/styles.css` (`@theme inline` + `:root`), never hardcoded colors in components.

## Sections (home page)

1. **Header** — fixed navbar, dark glassmorphism (`backdrop-blur-md`), logo left, links: Accueil, Nos Réalisations, Nos Références, Services, Contact, red CTA "Demandez un devis". Mobile drawer menu.
2. **Hero** — fullscreen background video (`autoplay loop muted playsinline`) from `/videos/`, dark gradient overlay, headline "Neyla Production — Agence de Création Audiovisuelle & Digitale à Casablanca", floating sound toggle (🔊/🔇) that unmutes on user click without breaking autoplay, scroll cue.
3. **Nos Réalisations** — filterable grid (Tous, Vidéos, Événements, Institutionnel) of YouTube entries; thumbnails pulled from `img.youtube.com/vi/{id}/maxresdefault.jpg`; click opens a responsive lightbox modal embedding `youtube.com/embed/{id}?rel=0&modestbranding=1&autoplay=1`.
4. **Notre Clientèle d'Exception** — logo marquee + grid from `/logos/`, grayscale by default, full color on hover.
5. **Nos Services** — 4 cards with the exact supplied French copy (Captation Vidéo, Shooting Corporate, Marketing Digital, Motion Design), red hover accent and Lucide icons.
6. **CTA banner** — "Prêt à discuter votre projet ? CONTACTEZ-NOUS" with red button scrolling to the contact form.
7. **Contact & Footer** — quote request form (nom, société, email, téléphone, service, message) with client-side validation and success toast, plus address block: 144 Rue Mohamed Smiha, 8ème Étage, Casablanca · +212 663 66 88 17 · contact@neylaproduction.ma. Footer with nav, socials, copyright.

## File architecture

```text
public/
  logos/        # client logos (README placeholder listing expected filenames)
  portfolio/    # photo assets
  team/         # team photos
  videos/       # best-of-neyla.mp4 hero video
src/
  components/
    Navbar.tsx  Hero.tsx  Realisations.tsx  VideoLightbox.tsx
    Clients.tsx Services.tsx CtaBanner.tsx  Contact.tsx  Footer.tsx
    SectionHeading.tsx
  data/
    site.ts     # company info, nav, services copy, contact details
    videos.ts   # typed video dataset (id, title, youtubeId, category)
    logos.ts    # typed client logo dataset (name, src)
  routes/
    index.tsx   # assembles all sections
site-data.txt   # content master doc + YouTube URLs to fill in
```

## Data templates (ready for real assets)

- `videos.ts`: `type VideoItem = { id: string; title: string; client?: string; youtubeId: string; category: "videos" | "evenements" | "institutionnel" }` seeded with clearly-marked example rows to replace.
- `logos.ts`: `type ClientLogo = { name: string; src: string }` seeded with Richbond, Hyundai, DP World and friends pointing at `/logos/*.png`.
- Placeholder hero video and logo files: I'll generate lightweight stand-ins so the layout renders before you drop in real files, and document exact expected filenames in `site-data.txt`.

## Technical notes

- Add the `motion` package (Framer Motion for React 19).
- Single index route with anchor scrolling for the main sections (as on ndfilms.ma), with per-route `head()` metadata: title, description, og/twitter tags in French.
- Static site, no backend — the quote form validates and shows a confirmation; wiring it to email/database can be a follow-up with Lovable Cloud.
