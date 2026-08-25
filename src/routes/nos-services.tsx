import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { services } from "@/data/site";
import { pageHead } from "@/lib/seo";

const process = [
  { step: "01", title: "Brief & stratégie", text: "Nous cadrons vos objectifs, votre cible et le message à porter." },
  { step: "02", title: "Pré-production", text: "Scénario, storyboard, casting, repérages et planning de tournage." },
  { step: "03", title: "Production", text: "Tournage avec équipements broadcast et équipe expérimentée." },
  { step: "04", title: "Post-production", text: "Montage, étalonnage, sound design, motion design et livraison multi-formats." },
];

export const Route = createFileRoute("/nos-services")({
  head: () =>
    pageHead({
      title: "Nos Services — Captation vidéo, photo, digital | Neyla Production",
      description:
        "Captation vidéo, shooting corporate, marketing digital et motion design : les services de Neyla Production, agence audiovisuelle à Casablanca.",
      path: "/nos-services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos Services"
        title="Une agence, quatre expertises"
        description="De la conception à la diffusion, nous produisons des contenus qui servent votre image et vos résultats."
      />

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Méthode" title="Notre processus de production" />
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="bg-card p-8">
                <p className="font-display text-4xl font-bold text-primary">{p.step}</p>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
