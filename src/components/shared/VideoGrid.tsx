import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { siteData } from "../../data/siteData";
import { fetchProjects, type PortfolioProject } from "../../lib/sanityQueries";
import { VideoLightbox } from "./VideoLightbox";

function prettify(title: string) {
  return title.replace(/^\d+\s+/, "").trim();
}

export function VideoGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState<PortfolioProject | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["sanity", "projects"],
    queryFn: fetchProjects,
    initialData: siteData.realisations as PortfolioProject[],
    staleTime: 5 * 60_000,
  });

  const all = data?.length ? data : (siteData.realisations as PortfolioProject[]);
  const videos = limit ? all.slice(0, limit) : all;

  if (isLoading && !data) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl bg-neutral-900">
            <div className="aspect-video rounded-xl bg-neutral-900" />
            <div className="p-5">
              <div className="h-3 w-2/3 rounded bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <motion.button
            key={video.youtubeId ?? video.url ?? video.title}
            type="button"
            onClick={() => setActive(video)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden border border-border bg-card text-left transition-colors duration-300 hover:border-primary hover:shadow-[0_24px_48px_-28px_var(--primary)]"
          >
            <div className="relative aspect-video overflow-hidden bg-secondary">
              <img
                src={video.thumbnail ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={prettify(video.title)}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors duration-300 group-hover:bg-black/10">
                <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-5 fill-current" />
                </span>
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-sm tracking-[0.12em] uppercase">
                {prettify(video.title)}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {active ? (
        <VideoLightbox
          youtubeId={active.youtubeId ?? ""}
          title={prettify(active.title)}
          onClose={() => setActive(null)}
        />
      ) : null}
    </>
  );
}
