import { useQuery } from "@tanstack/react-query";

import { sanityClient, urlFor } from "./sanity";
import { company, services as staticServices, type Service } from "../data/site";
import { siteData } from "../data/siteData";

/** Returns `fallback` when the Sanity value is missing or blank. */
function or<T extends string>(value: T | undefined | null, fallback: T): T {
  return value && value.trim() ? value : fallback;
}

/* ------------------------------- Hero ---------------------------------- */

export interface HeroContent {
  headline: string;
  subheadlineLines: string[];
  ctaText: string;
  ctaLink: string;
}

export const heroFallback: HeroContent = {
  headline: company.name,
  subheadlineLines: [
    "Agence audiovisuelle.",
    "Communication digitale.",
    "Relation presse.",
  ],
  ctaText: "",
  ctaLink: "/contact",
};

export async function fetchHero(): Promise<HeroContent> {
  try {
    const doc = await sanityClient.fetch<{
      headline?: string;
      subheadline?: string;
      ctaText?: string;
      ctaLink?: string;
    } | null>(`*[_type == "heroSection"][0]{ headline, subheadline, ctaText, ctaLink }`);
    if (!doc) return heroFallback;
    const lines = (doc.subheadline ?? "")
      .split(/\r?\n|\s*\|\s*/)
      .map((l) => l.trim())
      .filter(Boolean);
    return {
      headline: or(doc.headline, heroFallback.headline),
      subheadlineLines: lines.length ? lines : heroFallback.subheadlineLines,
      ctaText: or(doc.ctaText, heroFallback.ctaText),
      ctaLink: or(doc.ctaLink, heroFallback.ctaLink),
    };
  } catch {
    return heroFallback;
  }
}

export function useHeroContent() {
  return useQuery({
    queryKey: ["sanity", "heroSection"],
    queryFn: fetchHero,
    placeholderData: heroFallback,
    initialData: heroFallback,
  });
}

/* ------------------------------- About --------------------------------- */

export interface AboutContent {
  sectionTitle: string;
  tagline: string;
  description: string;
  image: string | null;
}

export const aboutFallback: AboutContent = {
  sectionTitle: "À propos",
  tagline:
    "Experts de l’image et créateurs de contenus audiovisuels percutants, nous mettons notre expertise technique et artistique au service de vos projets.",
  description:
    "Notre savoir-faire s’adresse à une clientèle diversifiée : Entreprises (Corporate), Enseignes, Marques, Institutions, Associations, Artistes, ou encore Particuliers. Que ce soit pour des productions vidéo, des shootings ou la création de contenus digitaux sur mesure, nous vous accompagnons à chaque étape du processus. Notre équipe s’engage à concevoir des contenus visuels qui captivent, inspirent et valorisent votre message, avec créativité, exigence et professionnalisme.",
  image: null,
};

export async function fetchAbout(): Promise<AboutContent> {
  try {
    const doc = await sanityClient.fetch<{
      sectionTitle?: string;
      tagline?: string;
      description?: string;
      mainImage?: unknown;
    } | null>(
      `*[_type == "aboutSection"][0]{ sectionTitle, tagline, description, mainImage }`,
    );
    if (!doc) return aboutFallback;
    return {
      sectionTitle: or(doc.sectionTitle, aboutFallback.sectionTitle),
      tagline: or(doc.tagline, aboutFallback.tagline),
      description: or(doc.description, aboutFallback.description),
      image: doc.mainImage
        ? urlFor(doc.mainImage as never)
            .width(900)
            .url()
        : null,
    };
  } catch {
    return aboutFallback;
  }
}

export function useAboutContent() {
  return useQuery({
    queryKey: ["sanity", "aboutSection"],
    queryFn: fetchAbout,
    placeholderData: aboutFallback,
    initialData: aboutFallback,
  });
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
    placeholderData: staticServices,
    initialData: staticServices,
  });
}

/* ------------------------------ Contact --------------------------------- */

export interface ContactContent {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  whatsappNumber: string;
}

export const contactFallback: ContactContent = {
  phonePrimary: siteData.company.phones[0] ?? "",
  phoneSecondary: siteData.company.phones[1] ?? "",
  email: company.email,
  address: company.address,
  whatsappNumber: "212665352673",
};

export async function fetchContactInfo(): Promise<ContactContent> {
  try {
    const doc = await sanityClient.fetch<Partial<ContactContent> | null>(
      `*[_type == "contactInfo"][0]{ phonePrimary, phoneSecondary, email, address, whatsappNumber }`,
    );
    if (!doc) return contactFallback;
    return {
      phonePrimary: or(doc.phonePrimary, contactFallback.phonePrimary),
      phoneSecondary: or(doc.phoneSecondary, contactFallback.phoneSecondary),
      email: or(doc.email, contactFallback.email),
      address: or(doc.address, contactFallback.address),
      whatsappNumber: or(doc.whatsappNumber, contactFallback.whatsappNumber),
    };
  } catch {
    return contactFallback;
  }
}

export function useContactInfo() {
  return useQuery({
    queryKey: ["sanity", "contactInfo"],
    queryFn: fetchContactInfo,
    placeholderData: contactFallback,
    initialData: contactFallback,
  });
}
