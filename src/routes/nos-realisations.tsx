import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";
import { PortfolioTabs } from "../components/shared/PortfolioTabs";
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
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Nos Réalisations"
        subtitle="Vidéos et photographies produites pour nos clients : institutionnel, événementiel, corporate et campagnes de marque."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16">
        <PortfolioTabs />
      </section>

      <CtaBanner />
    </>
  );
}
