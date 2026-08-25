import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";

import { siteData, type VideoRealisation } from "../../data/siteData";
import { VideoLightbox } from "./VideoLightbox";

function prettify(title: string) {
  return title.replace(/^\d+\s+/, "").trim();
}

export function VideoGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState<VideoRealisation | null>(null);
  const videos = limit ? siteData.realisations.slice(0, limit) : siteData.realisations;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <motion.button
            key={video.youtubeId ?? video.url}
            type="button"
            onClick={() => setActive(video)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05 }}
            className="group border border-border bg-card text-left transition-colors hover:border-primary"
          >
            <div className="relative aspect-video overflow-hidden bg-secondary">
              <img
                src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={prettify(video.title)}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/10">
                <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
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
