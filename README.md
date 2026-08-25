# Neyla Vision

You are an expert frontend developer building a high-end, modern website for Neyla Production (neylaproduction.ma), an audiovisual production agency based in Casablanca, Morocco. We are migrating and redesigning the current website based on the structural model of ndfilms.ma, customized with Neyla Production’s branding, color palette, and asset requirements.

Design System & Theme:

Color Palette: Luxury dark theme featuring Black (#0A0A0A), White (#FFFFFF), and Accent Red (#E50914 / #DC2626) matching Neyla’s brand identity.

Styling & Tech Stack: React, Tailwind CSS, Framer Motion (for smooth scroll animations), and Lucide React icons.

Required Project File Architecture:
Set up the project structure so it syncs cleanly with GitHub and reads assets directly from the /public directory:

Plaintext
├── public/
│   ├── logos/        # Client logos (Richbond, Hyundai, DP World, etc.)
│   ├── portfolio/    # High-res photo portfolio assets
│   ├── team/         # Team photos
│   └── videos/       # Best Of Neyla video asset
├── src/
│   ├── components/   # Modular section components
│   ├── data/         # Site configuration and video datasets
│   └── pages/
└── site-data.txt     # Content master document & YouTube URLs
Page Structure & Section Layout (Model: ndfilms.ma):

1. Header & Navigation:

Fixed top navbar with dark glassmorphism blur effect (backdrop-blur-md).

Logo on the left (Neyla Production).

Nav Links: Accueil, Nos Réalisations, Nos Références, Services, Contact.

High-contrast Red CTA button: "Demandez un devis".

2. Hero Section (Top Priority):

Full-screen background hero video with autoplay loop muted playsinline.

Include a floating, sleek sound toggle button (🔊 / 🔇) in the corner so users can click to unmute the full voiceover and audio seamlessly without breaking browser autoplay rules.

Minimalist dark overlay with headline: "Neyla Production - Agence de Création Audiovisuelle & Digitale à Casablanca".

3. Nos Réalisations (Video Portfolio Grid):

Grid layout inspired by ndfilms.ma.

Filterable categories (Tous, Vidéos, Événements, Institutionnel).

Displays YouTube video thumbnails dynamically. Clicking any card opens a responsive lightbox video modal embedded with parameters rel=0&modestbranding=1.

4. Notre Clientèle d’Exception (Nos Références):

Modern logo marquee / grid displaying corporate partners using images from /public/logos/.

Clean monochrome styling that turns full color on hover.

5. Nos Services (Exact Copy Required):
Create 4 distinct service cards with red hover accents and modern iconography using this exact text:

CAPTATION VIDEO: "Nous réalisons des vidéos et films professionnels pour vos événements, produits et campagnes. Avec une approche artistique et des équipements de pointe, nous créons des contenus percutants : vidéos promotionnelles, institutionnelles, montage et live streaming."

SHOOTING CORPORATE: "Nous réalisons des shooting photo professionnels pour valoriser votre image de marque et vos équipes. Nos photographes créent des visuels de qualité, adaptés aux réseaux sociaux, sites web et supports imprimés, pour renforcer votre visibilité et votre impact."

MARKETING DIGITAL: "Nous concevons et gérons des campagnes publicitaires en ligne performantes sur Google Ads, Facebook, Instagram et plus encore. Grâce à des stratégies sur mesure et un suivi continu, nous maximisons votre visibilité et votre retour sur investissement."

MOTION DESIGN: "Nous vous accompagnons dans la création de vidéos animées professionnelles qui transforment vos messages en expériences visuelles impactantes."

6. Call to Action (CTA Banner):

Prominent section featuring the headline: "Prêt à discuter votre projet? CONTACTER NOUS" with a primary Red action button opening the contact modal or scrolling down to the contact section.

7. Contact & Footer:

Interactive quote request form (Demandez un devis).

Address & Contact Info: 144, Rue Mohamed Smiha, 8ème Étage, Casablanca | +212 663 66 88 17 | contact@neylaproduction.ma.

Action Requested:

Initialize the complete project file architecture and baseline UI components.

Create the exact dataset template for videos and logos so I can connect my GitHub repository and populate all real assets instantly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/985ed2a7-4032-4302-adb1-b3841c7418af).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
