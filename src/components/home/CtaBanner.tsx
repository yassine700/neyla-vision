import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 120% at 80% 50%, color-mix(in oklch, var(--primary) 25%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold md:text-5xl">
          Prêt à discuter votre projet ?<br />
          <span className="text-primary">Contactez-nous</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/85"
        >
          Demandez un devis <ArrowRight className="size-4" />
        </Link>
        </div>
      </div>
    </section>
  );
}
