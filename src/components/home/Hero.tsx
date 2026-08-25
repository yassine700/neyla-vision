import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => undefined);
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      void v.play().catch(() => undefined);
    }
    setMuted(next);
  };

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-background">
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={site.heroVideo}
        poster={site.heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: "radial-gradient(70% 70% at 20% 30%, oklch(0.577 0.245 27.325 / 0.2), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-page relative py-32">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
        >
          <span className="h-px w-10 bg-primary" aria-hidden />
          Casablanca, Maroc
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-4xl text-4xl font-bold uppercase leading-[1.03] text-foreground sm:text-6xl lg:text-7xl"
        >
          Neyla Production
          <span className="mt-4 block text-xl font-medium normal-case leading-snug text-muted-foreground sm:text-2xl lg:text-3xl">
            Agence de Création Audiovisuelle & Digitale à Casablanca
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/nos-realisations"
            className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Voir nos réalisations
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Demandez un devis
          </Link>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute bottom-8 right-6 z-10 inline-flex size-12 items-center justify-center border border-border bg-background/60 text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
    </section>
  );
}
