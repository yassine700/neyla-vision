import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamGrid } from "@/components/shared/TeamGrid";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SafeImage } from "@/components/shared/SafeImage";
import { pageHead } from "@/lib/seo";

const values = [
  { title: "Exigence", text: "Chaque image est pensée, cadrée et étalonnée avec un niveau d'exigence broadcast." },
  { title: "Créativité", text: "Une direction artistique forte au service de votre message et de votre marque." },
  { title: "Réactivité", text: "Une équipe intégrée à Casablanca, capable de produire vite et bien." },
];

export const Route = createFileRoute("/a-propos")({
  head: () =>
    pageHead({
      title: "À Propos & Équipe — Neyla Production Casablanca",
      description:
        "Découvrez Neyla Production : notre histoire, nos valeurs et l'équipe de réalisateurs, photographes et motion designers basée à Casablanca.",
      path: "/a-propos",
    }),
  component: AProposPage,
});

function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À Propos"
        title="L'agence Neyla Production"
        description="Une agence de création audiovisuelle et digitale installée au cœur de Casablanca, au service des marques exigeantes."
      />

      <section className="container-page grid gap-14 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Notre histoire"
            title="Raconter vos marques en images"
            subtitle="Née de la passion de l'image, Neyla Production réunit réalisateurs, photographes, monteurs et motion designers sous un même toit. Nous concevons des contenus audiovisuels et des campagnes digitales qui allient qualité artistique et performance business."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-l-2 border-primary pl-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">{v.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/5] border border-border bg-card">
          <SafeImage
            src="/portfolio/agence.jpg"
            alt="L'équipe de Neyla Production en tournage à Casablanca"
            label="Photo agence — /portfolio/agence.jpg"
            className="size-full"
          />
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Notre équipe"
            title="Les visages derrière la caméra"
            subtitle="Une équipe pluridisciplinaire qui pilote vos projets de la stratégie à la livraison."
          />
          <div className="mt-12">
            <TeamGrid />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
