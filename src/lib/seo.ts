import { company, socials } from "../data/site";

export const SITE_URL = "https://neylaproduction.ma";
const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-poster.webp`;

function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
};

export function seo({ title, description, path, image, type = "website" }: SeoInput) {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: company.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  meta.push({ property: "og:image", content: ogImage });
  meta.push({ name: "twitter:image", content: ogImage });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema()),
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    sameAs: socials.map((social) => social.href),
    description: company.tagline,
    email: company.email,
    telephone: company.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: "144, Rue Mohamed Smiha, Res Jawharat Mohamed Smiha 6ème Étage N° 35",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: { "@type": "Country", name: "Maroc" },
  };
}
