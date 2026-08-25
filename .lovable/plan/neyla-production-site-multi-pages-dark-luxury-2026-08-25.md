# Neyla Production — site multi-pages (dark luxury)

Build the site as a true multi-page app with real URLs instead of one long scrolling page. Routing uses TanStack Router (the router this project is built on — same behaviour as React Router, type-safe file-based routes).

## Design system

- Palette: near-black `#0A0A0A` background, white text, accent red `#E50914` (hover `#DC2626`), muted grays.
- Bold display headings, uppercase tracked section labels, clean sans body.
- Framer Motion for scroll reveals and page transitions; Lucide React icons.
- Tokens defined in `src/styles.css` (`@theme inline` + `:root`) — no hardcoded colors in components.

## Routes

| URL | Page |
| --- | --- |
| `/` | Accueil — hero video, services teaser, réalisations teaser, clients marquee, CTA |
| `/nos-realisations` | Portfolio — dual tabs: Vidéos (YouTube) / Photos (galerie) |
| `/nos-services` | 4 service cards with the exact supplied French copy + detail blocks |
| `/nos-references` | Clientèle d'exception — logo grid/marquee |
| `/a-propos` | À propos + section Équipe avec portraits |
| `/contact` | Formulaire de devis + coordonnées + carte/adresse |

Navbar links become real route links (`<Link to="/nos-services">`) with active states — no more `#services` anchors. Mobile drawer menu mirrors the same routes. Red CTA "Demandez un devis" routes to `/contact`.

## Page details

- **Accueil**: fullscreen background video (`autoplay loop muted playsinline`) from `/videos/`, floating 🔊/🔇 sound toggle that unmutes on click, headline "Neyla Production — Agence de Création Audiovisuelle & Digitale à Casablanca", condensed teasers for services/réalisations/références each linking to its page, CTA banner "Prêt à discuter votre projet ? CONTACTEZ-NOUS".
- **/nos-realisations**: tab switcher Vidéos | Photos.
  - Vidéos: category filters (Tous, Vidéos, Événements, Institutionnel), YouTube thumbnails from `img.youtube.com/vi/{id}/maxresdefault.jpg`, lightbox modal embedding `?rel=0&modestbranding=1&autoplay=1`.
  - Photos: masonry gallery from `/public/portfolio/` with a full-screen image lightbox (prev/next, keyboard nav).
- **/nos-services**: the 4 cards (Captation Vidéo, Shooting Corporate, Marketing Digital, Motion Design) with exact copy, red hover accents, plus a process strip and CTA.
- **/nos-references**: grayscale-to-color logo grid + marquee from `/public/logos/`.
- **/a-propos**: agency story, key figures, and a Team grid built from `/public/team/` portraits (nom, rôle, hover overlay).
- **/contact**: quote form (nom, société, email, téléphone, service, message) with validation + success toast, and the info block: 144 Rue Mohamed Smiha, 8ème Étage, Casablanca · +212 663 66 88 17 · contact@neylaproduction.ma.
- Shared Footer on every page with route links, contact info, socials.

## SEO per route

Each route defines its own `head()`: unique French title, description, `og:title`, `og:description`, `og:type`, `og:url`, self-referencing canonical, plus LocalBusiness JSON-LD (name, address, phone, geo/area served, openingHours, sameAs) via the route `scripts` array. Root keeps only sitewide defaults (viewport, site name, twitter:card). `public/sitemap.xml` lists all six routes.

## File architecture

```text
public/
  logos/ portfolio/ team/ videos/
src/
  components/
    layout/   Navbar.tsx  Footer.tsx  PageHeader.tsx
    home/     Hero.tsx  ServicesTeaser.tsx  RealisationsTeaser.tsx  ClientsMarquee.tsx  CtaBanner.tsx
    shared/   ServiceCard.tsx  VideoCard.tsx  VideoLightbox.tsx  PhotoGallery.tsx  TeamGrid.tsx  ContactForm.tsx  SectionHeading.tsx
  data/
    site.ts     # coordonnées, nav, services copy, JSON-LD source
    videos.ts   # { id, title, client?, youtubeId, category }
    logos.ts    # { name, src }
    photos.ts   # { src, alt, category }
    team.ts     # { name, role, photo }
  routes/
    __root.tsx  index.tsx  nos-realisations.tsx  nos-services.tsx
    nos-references.tsx  a-propos.tsx  contact.tsx
site-data.txt   # content master doc + YouTube URLs + expected asset filenames
```

## Technical notes

- Add the `motion` package (Framer Motion for React 19).
- Datasets stay typed and seeded with clearly marked example rows so real assets from your GitHub repo drop straight in.
- No backend: the quote form validates client-side and confirms; wiring it to email/database is a follow-up with Lovable Cloud.
- If the single-page version already exists in the project, its sections are moved into the new page components rather than rewritten.
