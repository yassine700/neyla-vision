import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { VideoGrid } from "@/components/shared/VideoGrid";
import { ClientsMarquee } from "@/components/shared/ClientsMarquee";
import { services } from "@/data/site";
import { videos } from "@/data/videos";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Neyla Production — Agence Audiovisuelle & Digitale à Casablanca",
      description:
        "Neyla Production réalise vos films d'entreprise, captations vidéo, shootings corporate, campagnes digitales et motion design à Casablanca.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Nos Services" title="Ce que nous produisons" />
          <Link
            to="/nos-services"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Tous les services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Nos Réalisations" title="Nos dernières productions" />
            <Link
              to="/nos-realisations"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Voir le portfolio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12">
            <VideoGrid items={videos.slice(0, 3)} showFilters={false} />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nos Références"
            title="Notre clientèle d'exception"
            subtitle="Des groupes industriels aux marques internationales, nous accompagnons des entreprises exigeantes au Maroc."
            align="center"
          />
        </div>
        <div className="mt-14">
          <ClientsMarquee />
        </div>
        <div className="container-page mt-12 text-center">
          <Link
            to="/nos-references"
            className="inline-flex items-center gap-2 border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Toutes nos références
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
