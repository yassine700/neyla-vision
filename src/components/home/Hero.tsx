import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useMemo, useState } from "react";

import { siteData } from "../../data/siteData";
import { company } from "../../data/site";

export function Hero() {
  const [muted, setMuted] = useState(true);

  const src = useMemo(() => {
    const params = new URLSearchParams({
      background: "1",
      autoplay: "1",
      loop: "1",
      byline: "0",
      title: "0",
      muted: muted ? "1" : "0",
      autopause: "0",
    });
    return `https://player.vimeo.com/video/${siteData.heroVideo.vimeoId}?${params.toString()}`;
  }, [muted]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          key={muted ? "muted" : "unmuted"}
          src={src}
          title="Showreel Neyla Production"
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-eyebrow"
        >
          Production audiovisuelle · Casablanca
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 max-w-4xl text-4xl leading-[0.95] font-bold md:text-7xl"
        >
          {company.name}
          <span className="mt-3 block text-lg font-normal tracking-normal text-muted-foreground normal-case md:text-2xl">
            {company.tagline}
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/nos-realisations"
            className="inline-flex items-center gap-2 bg-primary px-7 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/85"
          >
            Voir nos réalisations <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-xs tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Demandez un devis
          </Link>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute right-5 bottom-8 z-10 grid size-12 place-items-center border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary hover:text-primary"
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
    </section>
  );
}
