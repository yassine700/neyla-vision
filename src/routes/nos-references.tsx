import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { LogoGrid } from "@/components/shared/LogoGrid";
import { ClientsMarquee } from "@/components/shared/ClientsMarquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageHead } from "@/lib/seo";

const stats = [
  { value: "+250", label: "Projets livrés" },
  { value: "+80", label: "Marques accompagnées" },
  { value: "12", label: "Années d'expérience" },
  { value: "4K", label: "Standard de production" },
];

export const Route = createFileRoute("/nos-references")({
  head: () =>
    pageHead({
      title: "Nos Références — Ils nous font confiance | Neyla Production",
      description:
        "Richbond, Hyundai, DP World et bien d'autres : découvrez la clientèle d'exception accompagnée par Neyla Production à Casablanca.",
      path: "/nos-references",
    }),
  component: ReferencesPage,
});

function ReferencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos Références"
        title="Notre clientèle d'exception"
        description="Groupes industriels, institutions et marques internationales nous confient leur image depuis plus de dix ans."
      />

      <section className="container-page py-20">
        <LogoGrid />
      </section>

      <section className="border-t border-border bg-card/40 py-20">
        <div className="container-page">
          <SectionHeading eyebrow="En chiffres" title="Une expérience qui se mesure" align="center" />
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-10 text-center">
                <p className="font-display text-4xl font-bold text-primary">{s.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-10">
        <ClientsMarquee />
      </div>

      <CtaBanner />
    </>
  );
}
