import { defineType, defineField, defineArrayMember } from "sanity";

export const project = defineType({
  name: "project",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "url", title: "Lien vidéo (YouTube)", type: "url" }),
    defineField({ name: "youtubeId", title: "ID YouTube", type: "string" }),
    defineField({
      name: "mainImage",
      title: "Vignette",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  preview: { select: { title: "title", media: "mainImage" } },
});

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Logo client",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Section Hero",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Titre principal", type: "string" }),
    defineField({ name: "subheadline", title: "Sous-titre", type: "string" }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
    defineField({ name: "ctaLink", title: "Lien du bouton", type: "string" }),
  ],
  preview: { select: { title: "headline", subtitle: "subheadline" } },
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "Section À propos",
  type: "document",
  fields: [
    defineField({ name: "sectionTitle", title: "Titre de section", type: "string" }),
    defineField({ name: "tagline", title: "Accroche", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
    defineField({
      name: "mainImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "sectionTitle", subtitle: "tagline", media: "mainImage" } },
});

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "bulletPoints",
      title: "Points clés",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "iconName",
      title: "Icône (nom Lucide)",
      type: "string",
      description: "Ex : video, camera, megaphone, newspaper, sparkles",
    }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "iconName" } },
});

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Coordonnées",
  type: "document",
  fields: [
    defineField({ name: "phonePrimary", title: "Téléphone principal", type: "string" }),
    defineField({ name: "phoneSecondary", title: "Téléphone secondaire", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 3 }),
    defineField({ name: "whatsappNumber", title: "Numéro WhatsApp", type: "string" }),
  ],
  preview: { select: { title: "email", subtitle: "phonePrimary" } },
});

export const schemaTypes = [
  project,
  clientLogo,
  heroSection,
  aboutSection,
  serviceItem,
  contactInfo,
];
