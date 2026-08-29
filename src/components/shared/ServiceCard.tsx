import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Camera, Megaphone, Newspaper, Sparkles, Video, ArrowUpRight } from "lucide-react";

import type { Service } from "../../data/site";

const icons = {
  video: Video,
  camera: Camera,
  megaphone: Megaphone,
  sparkles: Sparkles,
  newspaper: Newspaper,
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = icons[service.icon];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col border border-border bg-card p-10 transition-colors duration-300 hover:border-primary hover:shadow-[0_20px_40px_-24px_var(--primary)]"
    >
      <Icon className="size-12 text-primary transition-transform duration-300 group-hover:scale-110" />
      <h3 className="mt-8 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
      <ul className="mt-5 space-y-2">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 bg-primary" />
            {point}
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className="mt-8 inline-flex items-center gap-2 font-display text-xs tracking-[0.18em] text-primary uppercase transition-colors hover:text-foreground"
      >
        Discuter du projet{" "}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </motion.article>
  );
}
