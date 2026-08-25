import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { videoCategories, videos as allVideos, youtubeThumb, type VideoItem } from "@/data/videos";
import { VideoLightbox } from "./VideoLightbox";
import { SafeImage } from "./SafeImage";
import { cn } from "@/lib/utils";

export function VideoGrid({ items = allVideos, showFilters = true }: { items?: VideoItem[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<string>("tous");
  const [active, setActive] = useState<VideoItem | null>(null);

  const filtered = useMemo(
    () => (filter === "tous" ? items : items.filter((v) => v.category === filter)),
    [items, filter],
  );

  return (
    <div>
      {showFilters ? (
        <div className="mb-10 flex flex-wrap gap-3">
          {videoCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setFilter(cat.value)}
              className={cn(
                "border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                filter === cat.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video, i) => (
          <motion.button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
            className="group relative overflow-hidden border border-border bg-card text-left transition-colors hover:border-primary"
          >
            <div className="relative aspect-video overflow-hidden">
              <SafeImage
                src={youtubeThumb(video.youtubeId)}
                alt={video.title}
                label={video.title}
                className="size-full transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-5 translate-x-0.5" fill="currentColor" />
                </span>
              </span>
            </div>
            <div className="p-5">
              {video.client ? (
                <p className="text-[10px] uppercase tracking-[0.28em] text-primary">{video.client}</p>
              ) : null}
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-foreground">{video.title}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Aucune vidéo dans cette catégorie.</p>
      ) : null}

      <VideoLightbox video={active} onClose={() => setActive(null)} />
    </div>
  );
}
