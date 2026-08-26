import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env["VITE_SANITY_PROJECT_ID"] || "9zhezend";
const dataset = import.meta.env["VITE_SANITY_DATASET"] || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-26",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
