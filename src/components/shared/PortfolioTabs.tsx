import { Camera, Film } from "lucide-react";
import { useState } from "react";

import { VideoGrid } from "./VideoGrid";
import { PhotoGallery } from "./PhotoGallery";

export function PortfolioTabs({ videoLimit }: { videoLimit?: number }) {
  const [tab, setTab] = useState<"videos" | "photos">("videos");

  return (
    <div>
      <div className="mb-10 inline-flex border border-border">
        <button
          type="button"
          onClick={() => setTab("videos")}
          className={`inline-flex items-center gap-2 px-6 py-3 font-display text-xs tracking-[0.18em] uppercase transition-colors ${
            tab === "videos" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Film className="size-4" /> Vidéos
        </button>
        <button
          type="button"
          onClick={() => setTab("photos")}
          className={`inline-flex items-center gap-2 px-6 py-3 font-display text-xs tracking-[0.18em] uppercase transition-colors ${
            tab === "photos" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          <Camera className="size-4" /> Photos
        </button>
      </div>

      {tab === "videos" ? <VideoGrid {...(videoLimit ? { limit: videoLimit } : {})} /> : <PhotoGallery />}
    </div>
  );
}
