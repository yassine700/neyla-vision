import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(60% 120% at 80% 50%, oklch(0.577 0.245 27.325 / 0.22), transparent 70%)" }}
        aria-hidden
      />
      <div className="container-page relative flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl"
        >
          Prêt à discuter votre projet ?{" "}
          <span className="text-primary">Contactez-nous</span>
        </motion.h2>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Demandez un devis
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
