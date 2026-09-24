import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";

import { Reveal } from "../components/shared/Reveal";
import { CtaBanner } from "../components/home/CtaBanner";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/a-propos")({
  head: () =>
    seo({
      title: "À Propos & Équipe — Neyla Production Casablanca",
      description:
        "Neyla Production est une agence de création audiovisuelle et digitale basée à Casablanca. Découvrez notre vision et l'équipe derrière nos productions.",
      path: "/a-propos",
    }),
  component: AboutPage,
});

const stats = [
  { value: "15", label: "Marques accompagnées" },
  { value: "100%", label: "Production interne" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="L'agence"
        title="À Propos"
        subtitle="Une équipe de réalisateurs, cadreurs, photographes et motion designers réunis à Casablanca autour d'une même exigence : raconter juste."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Notre vision</h2>
            <p className="mt-6 text-muted-foreground">
              Chez Neyla Production, chaque image sert un message. Nous concevons des films
              institutionnels, des couvertures d'événements et des campagnes digitales qui
              traduisent l'identité de nos clients avec précision et élégance.
            </p>
            <p className="mt-4 text-muted-foreground">
              Du repérage au master final, tout est produit en interne : direction artistique,
              tournage multi-caméras, photographie, montage, étalonnage et motion design. Cette
              maîtrise complète garantit des délais tenus et une cohérence visuelle sans compromis.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-px self-start bg-border sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-8 text-center">
                <p className="font-display text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
