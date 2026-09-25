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

export const reel = defineType({
  name: "reel",
  title: "Reel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "videoFile",
      title: "Vidéo verticale (MP4, 1080 × 1920 recommandé)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Importez une vidéo verticale ou renseignez un lien YouTube Shorts ci-dessous.",
    }),
    defineField({ name: "youtubeUrl", title: "Lien YouTube Shorts (facultatif)", type: "url" }),
    defineField({ name: "cover", title: "Image de couverture verticale", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Ordre d’affichage (facultatif)", type: "number" }),
  ],
  preview: { select: { title: "title", media: "cover" } },
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

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuration du Site",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "À Propos" },
    { name: "services", title: "Services" },
    { name: "contact", title: "Contact & Footer" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Titre Hero",
      type: "string",
      group: "hero",
      initialValue: "NEYLA PRODUCTION",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre Hero",
      type: "text",
      rows: 3,
      description: "Une ligne par phrase (ou séparées par « | »).",
      group: "hero",
      initialValue: "Agence audiovisuelle, communication digitale et relations presse",
    }),
    defineField({
      name: "heroCtaText",
      title: "Texte du bouton Hero",
      type: "string",
      group: "hero",
      initialValue: "DEMANDER UN DEVIS",
    }),

    defineField({
      name: "aboutTitle",
      title: "Titre À Propos",
      type: "string",
      group: "about",
      initialValue: "À PROPOS",
    }),
    defineField({
      name: "aboutText",
      title: "Texte À Propos",
      type: "text",
      rows: 8,
      group: "about",
      initialValue:
        "Experts de l’image et créateurs de contenus audiovisuels percutants, nous mettons notre expertise technique et artistique au service de vos projets. Notre savoir-faire s’adresse à une clientèle diversifiée : Entreprises (Corporate), Enseignes, Marques, Institutions, Associations, Artistes, ou encore Particuliers.",
    }),
    defineField({
      name: "aboutImage",
      title: "Image À Propos",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),

    defineField({
      name: "servicesTitle",
      title: "Titre Services",
      type: "string",
      group: "services",
      initialValue: "CE QUE NOUS PRODUISONS",
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Sous-titre Services",
      type: "text",
      rows: 3,
      group: "services",
      initialValue:
        "Quatre pôle complémentaires pour couvrir toute la chaîne de production de votre contenu.",
    }),

    defineField({
      name: "phonePrimary",
      title: "Téléphone principal",
      type: "string",
      group: "contact",
      initialValue: "+212 663 68 88 17",
    }),
    defineField({
      name: "phoneSecondary",
      title: "Téléphone secondaire",
      type: "string",
      group: "contact",
      initialValue: "+212 665 36 26 73",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      initialValue: "Contact@neylaproduction.ma",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      group: "contact",
      initialValue:
        "144, Rue Mohamed Smiha, Res Jawharat Mohamed Smiha 6ème Étage N° 35, Casablanca",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Numéro WhatsApp",
      type: "string",
      group: "contact",
      initialValue: "212665352673",
    }),
  ],
  preview: { select: { title: "heroTitle", subtitle: "email" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "role", title: "Poste", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "orderAsc", title: "Ordre", type: "number" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const schemaTypes = [siteSettings, project, reel, clientLogo, serviceItem, teamMember];
