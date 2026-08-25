export const site = {
  name: "Neyla Production",
  legalName: "Neyla Production SARL",
  tagline: "Agence de Création Audiovisuelle & Digitale à Casablanca",
  description:
    "Neyla Production, agence de création audiovisuelle et digitale à Casablanca : captation vidéo, shooting corporate, marketing digital et motion design.",
  url: "https://neylaproduction.ma",
  email: "contact@neylaproduction.ma",
  phone: "+212 663 66 88 17",
  phoneHref: "+212663668817",
  address: {
    street: "144, Rue Mohamed Smiha, 8ème Étage",
    city: "Casablanca",
    country: "Maroc",
    postalCode: "20250",
  },
  socials: {
    instagram: "https://www.instagram.com/neylaproduction",
    facebook: "https://www.facebook.com/neylaproduction",
    linkedin: "https://www.linkedin.com/company/neylaproduction",
    youtube: "https://www.youtube.com/@neylaproduction",
  },
  heroVideo: "/videos/best-of-neyla.mp4",
  heroPoster: "/videos/best-of-neyla-poster.jpg",
} as const;

export const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Nos Réalisations", to: "/nos-realisations" },
  { label: "Nos Références", to: "/nos-references" },
  { label: "Services", to: "/nos-services" },
  { label: "À Propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  icon: "video" | "camera" | "megaphone" | "sparkles";
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "captation-video",
    title: "CAPTATION VIDEO",
    icon: "video",
    description:
      "Nous réalisons des vidéos et films professionnels pour vos événements, produits et campagnes. Avec une approche artistique et des équipements de pointe, nous créons des contenus percutants : vidéos promotionnelles, institutionnelles, montage et live streaming.",
    bullets: ["Vidéos promotionnelles", "Films institutionnels", "Montage & étalonnage", "Live streaming"],
  },
  {
    slug: "shooting-corporate",
    title: "SHOOTING CORPORATE",
    icon: "camera",
    description:
      "Nous réalisons des shooting photo professionnels pour valoriser votre image de marque et vos équipes. Nos photographes créent des visuels de qualité, adaptés aux réseaux sociaux, sites web et supports imprimés, pour renforcer votre visibilité et votre impact.",
    bullets: ["Portraits d'équipe", "Photo produit", "Reportage événementiel", "Retouche professionnelle"],
  },
  {
    slug: "marketing-digital",
    title: "MARKETING DIGITAL",
    icon: "megaphone",
    description:
      "Nous concevons et gérons des campagnes publicitaires en ligne performantes sur Google Ads, Facebook, Instagram et plus encore. Grâce à des stratégies sur mesure et un suivi continu, nous maximisons votre visibilité et votre retour sur investissement.",
    bullets: ["Google Ads", "Meta Ads", "Stratégie de contenu", "Reporting & ROI"],
  },
  {
    slug: "motion-design",
    title: "MOTION DESIGN",
    icon: "sparkles",
    description:
      "Nous vous accompagnons dans la création de vidéos animées professionnelles qui transforment vos messages en expériences visuelles impactantes.",
    bullets: ["Habillage graphique", "Animation 2D", "Explainer videos", "Génériques & logos animés"],
  },
];

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  image: `${site.url}/logo.png`,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.5883, longitude: -7.6114 },
  areaServed: "Maroc",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:30",
    },
  ],
  sameAs: Object.values(site.socials),
};
