import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";
import { ReelsGallery } from "../components/shared/ReelsGallery";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/reels")({
  head: () => seo({
    title: "Reels — Vidéos verticales | Neyla Production",
    description: "Découvrez les reels et vidéos verticales de Neyla Production : des images créées pour les marques et les événements.",
    path: "/reels",
  }),
  component: ReelsPage,
});

function ReelsPage() {
  return <>
    <PageHeader eyebrow="Portfolio" title="Reels" subtitle="Des histoires en format vertical." />
    <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24"><ReelsGallery /></section>
  </>;
}