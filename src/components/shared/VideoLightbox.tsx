import { useEffect } from "react";
import { X } from "lucide-react";
import { youtubeEmbed, type VideoItem } from "@/data/videos";

export function VideoLightbox({ video, onClose }: { video: VideoItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la vidéo"
        className="absolute right-5 top-5 inline-flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <X className="size-5" />
      </button>
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video w-full border border-border bg-card">
          <iframe
            src={youtubeEmbed(video.youtubeId)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
        <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {video.client ? `${video.client} — ` : ""}
          <span className="text-foreground">{video.title}</span>
        </p>
      </div>
    </div>
  );
}
