import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Film } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { VideoGrid } from "@/components/shared/VideoGrid";
import { PhotoGallery } from "@/components/shared/PhotoGallery";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/nos-realisations")({
  head: () =>
    pageHead({
      title: "Nos Réalisations — Portfolio vidéo & photo | Neyla Production",
      description:
        "Découvrez le portfolio de Neyla Production : films institutionnels, captations d'événements, vidéos de marque et galeries photo corporate réalisés à Casablanca.",
      path: "/nos-realisations",
    }),
  component: RealisationsPage,
});

function RealisationsPage() {
  const [tab, setTab] = useState<"videos" | "photos">("videos");

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Nos Réalisations"
        description="Vidéos et photographies produites pour nos clients : institutionnel, événementiel, corporate et campagnes de marque."
      />

      <section className="container-page py-16">
        <div className="mb-12 inline-flex border border-border">
          {[
            { key: "videos" as const, label: "Vidéos", Icon: Film },
            { key: "photos" as const, label: "Photos", Icon: Camera },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={cn(
                "inline-flex items-center gap-2 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
                tab === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "videos" ? <VideoGrid /> : <PhotoGallery />}
      </section>

      <CtaBanner />
    </>
  );
}
