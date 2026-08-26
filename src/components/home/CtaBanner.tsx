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
        <h2 className="text-2xl font-bold md:text-3xl">
          Prêt à discuter votre projet ?<br />
          <span className="text-primary">Contactez-nous</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/85 hover:shadow-[0_10px_30px_-10px_var(--primary)]"
          >
            Demandez un devis{" "}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
