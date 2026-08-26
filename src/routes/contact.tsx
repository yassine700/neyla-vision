import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "../components/shared/PageHeader";
import { ContactForm } from "../components/shared/ContactForm";
import { Reveal } from "../components/shared/Reveal";
import { company } from "../data/site";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact & Devis — Neyla Production Casablanca",
      description:
        "Contactez Neyla Production à Casablanca pour un devis vidéo ou photo : 144 Rue Mohamed Smiha, +212 663 66 88 17, Contact@neylaproduction.ma.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Décrivez-nous votre besoin : nous revenons vers vous avec une proposition et un devis sous 24h ouvrées."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          <div className="border border-border bg-card p-8">
            <p className="label-eyebrow">Coordonnées</p>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{company.address}</span>
              </li>
              {company.phones.map((phone) => (
                <li key={phone} className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
