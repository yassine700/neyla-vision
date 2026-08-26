import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./src/sanity/schemaTypes";
import { deskStructure } from "./src/sanity/deskStructure";

const SINGLETON_TYPES = new Set(["heroSection", "aboutSection", "contactInfo"]);

export default defineConfig({
  name: "neyla-production",
  title: "Neyla Production",
  projectId: import.meta.env["VITE_SANITY_PROJECT_ID"] || "9zhezend",
  dataset: import.meta.env["VITE_SANITY_DATASET"] || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !SINGLETON_TYPES.has(t.schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
});
