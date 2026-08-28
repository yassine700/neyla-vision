import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useMemo, useState } from "react";

import { siteData } from "../../data/siteData";
import { useHeroContent } from "../../lib/sanityContent";

const POSTER = "/hero-poster.webp";

export function Hero() {
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const { data: hero } = useHeroContent();

  // Video autoplays (muted) on all devices; the poster covers the buffering state.
  const showVideo = true;

  const src = useMemo(() => {
    const params = new URLSearchParams({
      background: "1",
      autoplay: "1",
      loop: "1",
      byline: "0",
      title: "0",
      muted: muted ? "1" : "0",
      autopause: "0",
      quality: "auto",
      dnt: "1",
    });
    return `https://player.vimeo.com/video/${siteData.heroVideo.vimeoId}?${params.toString()}`;
  }, [muted]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0A0A0A]">
        <img
          src={POSTER}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />
        {showVideo ? (
          <iframe
            key={muted ? "muted" : "unmuted"}
            src={src}
            title="Showreel Neyla Production"
            allow="autoplay; fullscreen"
            loading="eager"
            onLoad={() => setVideoReady(true)}
            className={`absolute top-1/2 left-1/2 aspect-video h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-black/10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-4xl text-4xl leading-[0.95] font-bold drop-shadow-xl md:text-7xl"
        >
          {hero.headline}
          <span className="mt-4 block text-lg font-normal tracking-normal normal-case drop-shadow-xl md:text-2xl">
            {hero.subheadlineLines.map((line) => (
              <span key={line} className="block text-primary">
                {line}
              </span>
            ))}
          </span>
        </motion.h1>
      </div>

      {showVideo ? (
        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? "Activer le son" : "Couper le son"}
          className="absolute right-5 bottom-8 z-10 grid size-12 place-items-center border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      ) : null}
    </section>
  );
}
