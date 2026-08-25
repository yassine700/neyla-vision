import * as motionReact from "motion/react";
import { cn } from "@/lib/utils";

const { motion } = motionReact;

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          {align === "left" && <span className="h-px w-8 bg-primary" aria-hidden />}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p> : null}
    </motion.div>
  );
}
