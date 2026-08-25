import { siteData } from "./siteData";

export const company = {
  name: siteData.company.name,
  tagline: "Agence de Création Audiovisuelle & Digitale à Casablanca",
  address:
    "144, Rue Mohamed Smiha, Res Jawharat Mohamed Smiha 6ème Étage N° 35, Casablanca",
  email: siteData.company.email,
  phones: siteData.company.phones,
  geo: { lat: 33.5883, lng: -7.6114 },
};

export const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/nos-realisations", label: "Nos Réalisations" },
  { to: "/nos-services", label: "Nos Services" },
  { to: "/nos-references", label: "Nos Références" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  icon: "video" | "camera" | "megaphone" | "sparkles";
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "captation-video",
    title: "Captation Vidéo",
    icon: "video",
    description:
      "Captation multi-caméras de vos événements, conférences et lancements produits, du tournage au montage final.",
    points: ["Multi-caméras 4K", "Interviews & aftermovies", "Live & streaming"],
  },
  {
    slug: "shooting-corporate",
    title: "Shooting Corporate",
    icon: "camera",
    description:
      "Photographie institutionnelle, portraits d'équipe, culinaire et immobilier au service de votre image de marque.",
    points: ["Portraits & équipes", "Culinaire & produit", "Architecture & immobilier"],
  },
  {
    slug: "marketing-digital",
    title: "Marketing Digital",
    icon: "megaphone",
    description:
      "Stratégie de contenu, community management et campagnes social media pensées pour la performance.",
    points: ["Stratégie éditoriale", "Social media", "Campagnes sponsorisées"],
  },
  {
    slug: "motion-design",
    title: "Motion Design",
    icon: "sparkles",
    description:
      "Animations graphiques, habillages et vidéos explicatives qui donnent du rythme à vos messages.",
    points: ["Habillage & génériques", "Vidéos explicatives", "Animation 2D/3D"],
  },
];

export const processSteps = [
  { step: "01", title: "Brief & Stratégie", text: "Nous cadrons vos objectifs, cibles et messages clés." },
  { step: "02", title: "Pré-production", text: "Scénario, repérages, casting, plan de tournage et logistique." },
  { step: "03", title: "Production", text: "Tournage et shooting avec une équipe et un matériel professionnels." },
  { step: "04", title: "Post-production", text: "Montage, étalonnage, motion design, sound design et livraison." },
];
