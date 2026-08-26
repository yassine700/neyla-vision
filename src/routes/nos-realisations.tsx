import { createFileRoute } from "@tanstack/react-router";
import { Camera, Film } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "../components/shared/PageHeader";
import { VideoGrid } from "../components/shared/VideoGrid";
import { PhotoGallery } from "../components/shared/PhotoGallery";
import { CtaBanner } from "../components/home/CtaBanner";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/nos-realisations")({
  head: () =>
    seo({
      title: "Nos Réalisations — Portfolio Vidéo & Photo | Neyla Production",
      description:
        "Découvrez nos réalisations à Casablanca : films institutionnels, aftermovies événementiels, shooting corporate, culinaire et immobilier au Maroc.",
      path: "/nos-realisations",
    }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [tab, setTab] = useState<"videos" | "photos">("videos");

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Nos Réalisations"
        subtitle="Vidéos et photographies produites pour nos clients : institutionnel, événementiel, corporate et campagnes de marque."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16">
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

        {tab === "videos" ? <VideoGrid /> : <PhotoGallery />}
      </section>

      <CtaBanner />
    </>
  );
}
