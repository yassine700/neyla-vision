import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Hero } from "../components/home/Hero";
import { CtaBanner } from "../components/home/CtaBanner";
import { AboutIntro } from "../components/home/AboutIntro";
import { SectionHeading } from "../components/shared/SectionHeading";
import { ServiceCard } from "../components/shared/ServiceCard";
import { VideoGrid } from "../components/shared/VideoGrid";
import { ClientsMarquee } from "../components/shared/ClientsMarquee";
import { services } from "../data/site";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Neyla Production — Agence Audiovisuelle & Digitale à Casablanca",
      description:
        "Agence de production audiovisuelle à Casablanca : captation vidéo, shooting corporate, marketing digital et motion design pour les marques et institutions au Maroc.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Portfolio"
              title="Réalisations récentes"
              subtitle="Une sélection de films institutionnels, événementiels et corporate."
            />
            <Link
              to="/nos-realisations"
              className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] text-primary uppercase"
            >
              Tout voir <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12">
            <VideoGrid limit={6} />
          </div>
        </div>
      </section>

      <section className="border-t border-border pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 pb-10">
          <SectionHeading eyebrow="Ils nous font confiance" title="Nos références" align="center" />
        </div>
        <ClientsMarquee />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Nos expertises"
          title="Ce que nous produisons"
          subtitle="Cinq pôles complémentaires pour couvrir toute la chaîne de production de votre contenu."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <AboutIntro />

      <CtaBanner />
    </>
  );
}
