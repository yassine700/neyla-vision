import { sanityClient, urlFor } from "./sanity";

export type Reel = {
  id: string;
  title: string;
  videoUrl?: string | undefined;
  youtubeId?: string | undefined;
  cover?: string | undefined;
};

type ReelDocument = {
  _id: string;
  title?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  cover?: unknown;
};

const REELS_QUERY = `*[_type == "reel" && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
  _id, title, youtubeUrl, cover, "videoUrl": videoFile.asset->url
}`;

function getYoutubeId(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
      return parsed.pathname.split("/")[1] || undefined;
    }
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(parsed.hostname)) {
      const segment = parsed.pathname.split("/")[2];
      return parsed.pathname === "/watch" ? (parsed.searchParams.get("v") ?? undefined) : segment;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export async function fetchReels(): Promise<Reel[]> {
  const docs = await sanityClient.fetch<ReelDocument[]>(REELS_QUERY);
  return docs.flatMap((doc) => {
    const youtubeId = getYoutubeId(doc.youtubeUrl);
    if (!doc.videoUrl && !youtubeId) return [];
    return [{
      id: doc._id,
      title: doc.title?.trim() || "Reel Neyla Production",
      videoUrl: doc.videoUrl,
      youtubeId,
      cover: doc.cover ? urlFor(doc.cover as never).width(540).height(960).fit("crop").url() : undefined,
    }];
  });
}