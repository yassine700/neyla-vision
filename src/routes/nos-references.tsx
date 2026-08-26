import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";
import { LogoGrid } from "../components/shared/LogoGrid";
import { ClientsMarquee } from "../components/shared/ClientsMarquee";
import { CtaBanner } from "../components/home/CtaBanner";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/nos-references")({
  head: () =>
    seo({
      title: "Nos Références — Clients & Partenaires | Neyla Production",
      description:
        "Lafarge, Hyundai, Richbond, UM6P, Gitex Africa, FRMK… découvrez les marques et institutions qui font confiance à Neyla Production à Casablanca.",
      path: "/nos-references",
    }),
  component: ReferencesPage,
});

function ReferencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clientèle"
        title="Ils nous font confiance"
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <LogoGrid />
      </section>

      <ClientsMarquee />
      <CtaBanner />
    </>
  );
}
