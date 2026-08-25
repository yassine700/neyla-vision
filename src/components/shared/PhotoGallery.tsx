import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoCategories, photos as allPhotos } from "@/data/photos";
import { SafeImage } from "./SafeImage";
import { cn } from "@/lib/utils";

export function PhotoGallery() {
  const [filter, setFilter] = useState<string>("tous");
  const [index, setIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "tous" ? allPhotos : allPhotos.filter((p) => p.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, filtered.length]);

  const current = index === null ? null : filtered[index];

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {photoCategories.map((cat) => (
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

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {filtered.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className={cn(
              "group block w-full overflow-hidden border border-border bg-card transition-colors hover:border-primary",
              i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]",
            )}
          >
            <SafeImage
              src={photo.src}
              alt={photo.alt}
              label={photo.alt}
              className="size-full transition-transform duration-700 group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Aucune photo dans cette catégorie.</p>
      ) : null}

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setIndex(null)}
            className="absolute right-5 top-5 inline-flex size-11 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
            }}
            className="absolute left-4 inline-flex size-11 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i + 1) % filtered.length));
            }}
            className="absolute right-4 inline-flex size-11 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </button>
          <figure className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] w-full border border-border bg-card">
              <SafeImage src={current.src} alt={current.alt} label={current.alt} className="size-full object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">{current.alt}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
