export type VideoCategory = "videos" | "evenements" | "institutionnel";

export type VideoItem = {
  id: string;
  title: string;
  client?: string;
  /** ID YouTube uniquement (ex: pour https://youtu.be/dQw4w9WgXcQ -> "dQw4w9WgXcQ") */
  youtubeId: string;
  category: VideoCategory;
};

export const videoCategories: { value: VideoCategory | "tous"; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "videos", label: "Vidéos" },
  { value: "evenements", label: "Événements" },
  { value: "institutionnel", label: "Institutionnel" },
];

/**
 * TEMPLATE — remplacez ces entrées par vos vraies vidéos (voir site-data.txt).
 * Ne changez pas la forme des objets : le site lit ce fichier directement.
 */
export const videos: VideoItem[] = [
  { id: "v-01", title: "Best Of Neyla Production", client: "Neyla Production", youtubeId: "ScMzIvxBSi4", category: "videos" },
  { id: "v-02", title: "Film institutionnel — Richbond", client: "Richbond", youtubeId: "ScMzIvxBSi4", category: "institutionnel" },
  { id: "v-03", title: "Lancement produit — Hyundai", client: "Hyundai", youtubeId: "ScMzIvxBSi4", category: "videos" },
  { id: "v-04", title: "Couverture événement — DP World", client: "DP World", youtubeId: "ScMzIvxBSi4", category: "evenements" },
  { id: "v-05", title: "Convention annuelle", client: "Client à définir", youtubeId: "ScMzIvxBSi4", category: "evenements" },
  { id: "v-06", title: "Corporate movie", client: "Client à définir", youtubeId: "ScMzIvxBSi4", category: "institutionnel" },
];

export const youtubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
