import { localBusinessJsonLd, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function pageHead({ title, description, path, type = "website" }: SeoInput) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { property: "og:locale", content: "fr_MA" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ ...localBusinessJsonLd, url: `${site.url}${path === "/" ? "" : path}` }),
      },
    ],
  };
}
