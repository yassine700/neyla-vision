import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { site } from "@/data/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact & Devis — Neyla Production Casablanca",
      description:
        "Demandez un devis à Neyla Production : 144 Rue Mohamed Smiha, 8ème étage, Casablanca. Tél. +212 663 66 88 17 — contact@neylaproduction.ma.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Demandez un devis"
        description="Parlez-nous de votre projet : nous revenons vers vous sous 24 heures ouvrées avec une proposition adaptée."
      />

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-border bg-card p-8 sm:p-10">
          <ContactForm />
        </div>

        <aside className="space-y-8">
          <div className="border border-border bg-card p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Coordonnées</h2>
            <ul className="mt-6 space-y-5 text-sm text-muted-foreground">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Lundi — Vendredi : 9h00 – 18h30</span>
              </li>
            </ul>
          </div>

          <div className="aspect-[4/3] border border-border">
            <iframe
              title="Localisation de Neyla Production à Casablanca"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-7.6250%2C33.5820%2C-7.5980%2C33.5960&layer=mapnik&marker=33.5883%2C-7.6114"
              loading="lazy"
              className="size-full grayscale"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
