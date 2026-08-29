import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { siteData } from "../../data/siteData";

const categories = [
  { slug: "all", label: "Tous" },
  { slug: "evenementiel", label: "Événementiel" },
  { slug: "institutionnelle", label: "Institutionnel" },
  { slug: "culinaire", label: "Culinaire" },
  { slug: "immobilier", label: "Immobilier" },
] as const;

type Slug = (typeof categories)[number]["slug"];

export function PhotoGallery() {
  const [filter, setFilter] = useState<Slug>("all");
  const [index, setIndex] = useState<number | null>(null);

  const photos = useMemo(() => {
    const p = siteData.portfolio;
    const entries: { src: string; label: string }[] = [];
    const push = (list: string[], label: string) =>
      list.forEach((src) => entries.push({ src, label }));
    if (filter === "all" || filter === "evenementiel") push(p.evenementiel, "Événementiel");
    if (filter === "all" || filter === "institutionnelle")
      push(p.institutionnelle, "Institutionnel");
    if (filter === "all" || filter === "culinaire") push(p.culinaire, "Culinaire");
    if (filter === "all" || filter === "immobilier") push(p.immobilier, "Immobilier");
    return entries;
  }, [filter]);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => {
              setFilter(cat.slug);
              setIndex(null);
            }}
            className={`px-5 py-2.5 font-display text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 ${
              filter === cat.slug
                ? "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_var(--primary)]"
                : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {photos.map((photo, i) => (
            <motion.button
              layout
              key={`${filter}-${photo.src}`}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.45,
                delay: Math.min(i, 12) * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group block w-full break-inside-avoid overflow-hidden border border-border transition-colors duration-300 hover:border-primary"
            >
              <img
                src={photo.src}
                alt={`${photo.label} — Neyla Production`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={close}
            className="absolute top-5 right-5 grid size-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 grid size-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 grid size-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </button>
          <img
            src={current.src}
            alt={`${current.label} — Neyla Production`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain"
          />
          <p className="absolute bottom-6 font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {current.label} · {(index ?? 0) + 1}/{photos.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
