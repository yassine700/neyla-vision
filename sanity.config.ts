import { defineConfig, defineType, defineField } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

const project = defineType({
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

const clientLogo = defineType({
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

export default defineConfig({
  name: "neyla-production",
  title: "Neyla Production",
  projectId: import.meta.env["VITE_SANITY_PROJECT_ID"] || "9zhezend",
  dataset: import.meta.env["VITE_SANITY_DATASET"] || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: [project, clientLogo] },
});
