import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Music2, Phone, Youtube } from "lucide-react";

import { company, navLinks, socials } from "../../data/site";
import { useContactInfo } from "../../lib/sanityContent";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: Music2,
  youtube: Youtube,
} as const;

export function Footer() {
  const { data: contact } = useContactInfo();
  const phones = [contact.phonePrimary, contact.phoneSecondary].filter(Boolean);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold tracking-widest">
            NEYLA <span className="text-primary">PRODUCTION</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {company.tagline}. Captation vidéo, shooting corporate, marketing digital et motion
            design.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid size-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow">Navigation</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{contact.address}</span>
            </li>
            {phones.map((phone) => (
              <li key={phone} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {company.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
