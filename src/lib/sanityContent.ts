import { useQuery } from "@tanstack/react-query";

import { sanityClient, urlFor } from "./sanity";
import { company, services as staticServices, type Service } from "../data/site";
import { siteData } from "../data/siteData";

/** Returns `fallback` when the Sanity value is missing or blank. */
function or<T extends string>(value: T | undefined | null, fallback: T): T {
  return value && value.trim() ? value : fallback;
}

/* --------------------------- Site settings ------------------------------ */

export interface SiteSettingsContent {
  heroTitle: string;
  heroSubtitleLines: string[];
  heroCtaText: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string | null;
  servicesTitle: string;
  servicesSubtitle: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  whatsappNumber: string;
}

export const siteSettingsFallback: SiteSettingsContent = {
  heroTitle: company.name,
  heroSubtitleLines: [
    "Agence audiovisuelle.",
    "Communication digitale.",
    "Relation presse.",
  ],
  heroCtaText: "DEMANDER UN DEVIS",
  aboutTitle: "À propos",
  aboutText:
    "Experts de l’image et créateurs de contenus audiovisuels percutants, nous mettons notre expertise technique et artistique au service de vos projets. Notre savoir-faire s’adresse à une clientèle diversifiée : Entreprises (Corporate), Enseignes, Marques, Institutions, Associations, Artistes, ou encore Particuliers. Que ce soit pour des productions vidéo, des shootings ou la création de contenus digitaux sur mesure, nous vous accompagnons à chaque étape du processus.",
  aboutImage: null,
  servicesTitle: "Ce que nous produisons",
  servicesSubtitle:
    "Quatre pôles complémentaires pour couvrir toute la chaîne de production de votre contenu.",
  phonePrimary: siteData.company.phones[0] ?? "",
  phoneSecondary: siteData.company.phones[1] ?? "",
  email: company.email,
  address: company.address,
  whatsappNumber: "212665352673",
};

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  heroTitle, heroSubtitle, heroCtaText,
  aboutTitle, aboutText, aboutImage,
  servicesTitle, servicesSubtitle,
  phonePrimary, phoneSecondary, email, address, whatsappNumber
}`;

export async function fetchSiteSettings(): Promise<SiteSettingsContent> {
  try {
    const doc = await sanityClient.fetch<
      (Partial<Omit<SiteSettingsContent, "heroSubtitleLines" | "aboutImage">> & {
        heroSubtitle?: string;
        aboutImage?: unknown;
      }) | null
    >(SITE_SETTINGS_QUERY);
    if (!doc) return siteSettingsFallback;

    const lines = (doc.heroSubtitle ?? "")
      .split(/\r?\n|\s*\|\s*/)
      .map((l) => l.trim())
      .filter(Boolean);

    return {
      heroTitle: or(doc.heroTitle, siteSettingsFallback.heroTitle),
      heroSubtitleLines: lines.length ? lines : siteSettingsFallback.heroSubtitleLines,
      heroCtaText: or(doc.heroCtaText, siteSettingsFallback.heroCtaText),
      aboutTitle: or(doc.aboutTitle, siteSettingsFallback.aboutTitle),
      aboutText: or(doc.aboutText, siteSettingsFallback.aboutText),
      aboutImage: doc.aboutImage
        ? urlFor(doc.aboutImage as never)
            .width(900)
            .url()
        : null,
      servicesTitle: or(doc.servicesTitle, siteSettingsFallback.servicesTitle),
      servicesSubtitle: or(doc.servicesSubtitle, siteSettingsFallback.servicesSubtitle),
      phonePrimary: or(doc.phonePrimary, siteSettingsFallback.phonePrimary),
      phoneSecondary: or(doc.phoneSecondary, siteSettingsFallback.phoneSecondary),
      email: or(doc.email, siteSettingsFallback.email),
      address: or(doc.address, siteSettingsFallback.address),
      whatsappNumber: or(doc.whatsappNumber, siteSettingsFallback.whatsappNumber),
    };
  } catch {
    return siteSettingsFallback;
  }
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["sanity", "siteSettings"],
    queryFn: fetchSiteSettings,
    initialData: siteSettingsFallback,
  });
}

/* --------------------- Section-specific view models ---------------------- */

export function useHeroContent() {
  const { data } = useSiteSettings();
  return {
    data: {
      headline: data.heroTitle,
      subheadlineLines: data.heroSubtitleLines,
      ctaText: data.heroCtaText,
      ctaLink: "/contact",
    },
  };
}

export function useAboutContent() {
  const { data } = useSiteSettings();
  return {
    data: {
      sectionTitle: data.aboutTitle,
      tagline: data.aboutText,
      description: "",
      image: data.aboutImage,
    },
  };
}

export function useContactInfo() {
  const { data } = useSiteSettings();
  return {
    data: {
      phonePrimary: data.phonePrimary,
      phoneSecondary: data.phoneSecondary,
      email: data.email,
      address: data.address,
      whatsappNumber: data.whatsappNumber,
    },
  };
}

/* ------------------------------ Services -------------------------------- */

const iconNames = ["video", "camera", "megaphone", "sparkles", "newspaper"] as const;
type IconName = (typeof iconNames)[number];

function toIcon(name?: string): IconName {
  const lower = (name ?? "").toLowerCase().trim() as IconName;
  return iconNames.includes(lower) ? lower : "sparkles";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const docs = await sanityClient.fetch<
      Array<{
        title?: string;
        description?: string;
        bulletPoints?: string[];
        iconName?: string;
      }>
    >(
      `*[_type == "serviceItem"] | order(order asc, _createdAt asc){ title, description, bulletPoints, iconName }`,
    );
    if (!docs?.length) return staticServices;
    const mapped = docs
      .filter((doc) => Boolean(doc.title))
      .map((doc, i) => ({
        slug: slugify(doc.title ?? `service-${i}`),
        title: doc.title ?? "",
        icon: toIcon(doc.iconName),
        description: doc.description ?? "",
        points: doc.bulletPoints?.filter(Boolean) ?? [],
      }));
    return mapped.length ? mapped : staticServices;
  } catch {
    return staticServices;
  }
}

export function useServicesContent() {
  return useQuery({
    queryKey: ["sanity", "serviceItem"],
    queryFn: fetchServices,
    initialData: staticServices,
  });
}
