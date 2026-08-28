import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";
import { TeamSection } from "../components/home/TeamSection";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/equipe")({
  head: () =>
    seo({
      title: "Notre Équipe — Neyla Production",
      description:
        "Rencontrez l'équipe Neyla Production : réalisateurs, vidéastes, photographes et chargés de relations presse basés à Casablanca.",
      path: "/equipe",
    }),
  component: EquipePage,
});

function EquipePage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre équipe"
        title="Les talents de Neyla Production"
        subtitle="Réalisation, image, son et stratégie de contenu : découvrez les visages derrière chaque production."
      />
      <TeamSection bare />
    </>
  );
}
