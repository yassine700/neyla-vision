import { siteData } from "./siteData";

export const company = {
  name: siteData.company.name,
  tagline: "Agence audiovisuelle, communication digitale et relations presse",
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

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585832632916", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/neylaproduction", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/neyla-production", icon: "linkedin" },
  { label: "TikTok", href: "https://www.tiktok.com/@neylaproduction", icon: "tiktok" },
  { label: "YouTube", href: "https://www.youtube.com/@Neylaproduction", icon: "youtube" },
] as const;

export type Service = {
  slug: string;
  title: string;
  icon: "video" | "camera" | "megaphone" | "sparkles" | "newspaper";
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
    slug: "communication-digital",
    title: "Communication Digitale",
    icon: "megaphone",
    description:
      "Stratégie de contenu, community management et campagnes social media pensées pour la performance.",
    points: ["Stratégie éditoriale", "Social media", "Campagnes sponsorisées"],
  },
  {
    slug: "relation-presse",
    title: "Relation Presse",
    icon: "newspaper",
    description:
      "Nous accompagnons nos clients dans la conception et la mise en œuvre de leur stratégie de relations médias afin d'obtenir une couverture éditoriale qualitative. Notre mission est de développer votre visibilité médiatique et de renforcer votre notoriété auprès de vos publics cibles.",
    points: ["Stratégie médias", "Relations journalistes", "Couverture éditoriale"],
  },
];

export const processSteps = [
  { step: "01", title: "Brief & Stratégie", text: "Nous cadrons vos objectifs, cibles et messages clés." },
  { step: "02", title: "Pré-production", text: "Scénario, repérages, casting, plan de tournage et logistique." },
  { step: "03", title: "Production", text: "Tournage et shooting avec une équipe et un matériel professionnels." },
  { step: "04", title: "Post-production", text: "Montage, étalonnage, motion design, sound design et livraison." },
];
