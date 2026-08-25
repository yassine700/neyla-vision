import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { navLinks, services, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-foreground">
            Neyla <span className="text-primary">Production</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Agence de création audiovisuelle & digitale à Casablanca. Captation vidéo, shooting corporate, marketing
            digital et motion design.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.socials.instagram, Icon: Instagram, label: "Instagram" },
              { href: site.socials.facebook, Icon: Facebook, label: "Facebook" },
              { href: site.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: site.socials.youtube, Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Navigation</p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Contact</p>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-foreground">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Neyla Production. Tous droits réservés.</p>
          <p className="uppercase tracking-[0.2em]">
            {services.map((s) => s.title.toLowerCase()).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
