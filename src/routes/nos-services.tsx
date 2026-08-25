import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/shared/PageHeader";
import { ServiceCard } from "../components/shared/ServiceCard";
import { SectionHeading } from "../components/shared/SectionHeading";
import { Reveal } from "../components/shared/Reveal";
import { CtaBanner } from "../components/home/CtaBanner";
import { processSteps, services } from "../data/site";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/nos-services")({
  head: () =>
    seo({
      title: "Nos Services — Captation Vidéo & Motion Design | Neyla Production",
      description:
        "Captation vidéo, shooting corporate, marketing digital et motion design à Casablanca. Une agence audiovisuelle complète pour vos projets au Maroc.",
      path: "/nos-services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Nos Services"
        subtitle="De l'idée à la diffusion, nous produisons des contenus vidéo et photo qui servent vos objectifs de communication."
      />

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
          <SectionHeading
            eyebrow="Méthode"
            title="Notre processus"
            subtitle="Un cadre clair et éprouvé, du premier brief à la livraison des masters."
          />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06} className="bg-background p-8">
                <p className="font-display text-4xl font-bold text-primary">{step.step}</p>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
