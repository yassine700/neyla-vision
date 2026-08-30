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
  { value: "13", label: "Marques accompagnées" },
  { value: "100%", label: "Production interne" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="L'agence"
        title="À Propos"
        subtitle="Une équipe de réalisateurs, cadreurs, photographes et motion designers réunis autour d'une même exigence : raconter juste."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Notre vision</h2>
            <p className="mt-6 text-muted-foreground">
              Spécialisés dans l’image, la création de contenus audiovisuels et la communication
              digitale, nous mettons notre savoir-faire technique, notre créativité et notre vision
              stratégique au service de vos projets.
            </p>
            <p className="mt-4 text-muted-foreground">
              Nous accompagnons une clientèle diversifiée - entreprises, enseignes, marques,
              institutions, associations, artistes et particuliers - dans la conception et la mise
              en œuvre de leur communication.
            </p>
            <p className="mt-4 text-muted-foreground">
              De la production vidéo et du shooting photo à la création de contenus digitaux, en
              passant par le motion design, la gestion des réseaux sociaux, la stratégie de
              communication digitale et les relations presse, nous concevons des solutions sur mesure
              adaptées à vos objectifs et à votre identité.
            </p>
            <p className="mt-4 text-muted-foreground">
              Notre approche combine créativité, qualité d’exécution et stratégie, afin de construire
              une communication cohérente, renforcer votre visibilité et valoriser durablement
              votre image.
            </p>
            <p className="mt-4 text-muted-foreground">
              De l’idée à la diffusion, nous vous accompagnons à chaque étape pour créer des contenus
              qui captent l’attention, racontent votre histoire et créent de l’impact.
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
