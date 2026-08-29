import { sanityClient, urlFor } from "./sanity";
import { siteData, type ClientReference, type VideoRealisation } from "../data/siteData";

export interface PortfolioProject {
  title: string;
  url: string;
  youtubeId?: string | undefined;
  thumbnail?: string | undefined;
}

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc){
  _id, title, url, youtubeId, mainImage
}`;

const LOGOS_QUERY = `*[_type == "clientLogo"] | order(order asc){ _id, name, logo }`;

function youtubeIdFromUrl(url?: string) {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{6,})/);
  return match?.[1];
}

export async function fetchProjects(): Promise<PortfolioProject[]> {
  try {
    const docs =
      await sanityClient.fetch<
        Array<{ title?: string; url?: string; youtubeId?: string; mainImage?: unknown }>
      >(PROJECTS_QUERY);
    if (!docs?.length) return siteData.realisations;
    return docs.map((doc) => ({
      title: doc.title ?? "",
      url: doc.url ?? "",
      youtubeId: doc.youtubeId ?? youtubeIdFromUrl(doc.url),
      thumbnail: doc.mainImage
        ? urlFor(doc.mainImage as never)
            .width(800)
            .url()
        : undefined,
    }));
  } catch {
    return siteData.realisations;
  }
}

export async function fetchClientLogos(): Promise<ClientReference[]> {
  try {
    const docs = await sanityClient.fetch<Array<{ name?: string; logo?: unknown }>>(LOGOS_QUERY);
    if (!docs?.length) return siteData.references;
    const mapped = docs
      .filter((doc) => Boolean(doc.logo))
      .map((doc) => ({
        name: doc.name ?? "Client",
        logo: urlFor(doc.logo as never)
          .width(400)
          .url(),
      }));
    return mapped.length ? mapped : siteData.references;
  } catch {
    return siteData.references;
  }
}
