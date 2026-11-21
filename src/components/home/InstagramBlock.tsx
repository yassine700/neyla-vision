import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { INSTAGRAM_ACCOUNT } from "../../data/instagramReels";
import { SectionHeading } from "../shared/SectionHeading";

export function InstagramBlock() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:py-28">
        <SectionHeading
          eyebrow="Instagram"
          title={`@${INSTAGRAM_ACCOUNT}`}
          subtitle="Coulisses de tournage, reels et projets en cours : suivez Neyla Production au quotidien."
        />
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-[0_10px_30px_-10px_var(--primary)]"
          >
            Suivez-nous{" "}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            to="/reels"
            className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-xs tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Voir nos reels <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
