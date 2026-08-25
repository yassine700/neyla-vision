import { motion } from "motion/react";
import { Camera, Megaphone, Sparkles, Video } from "lucide-react";
import type { Service } from "@/data/site";

const icons = { video: Video, camera: Camera, megaphone: Megaphone, sparkles: Sparkles } as const;

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = icons[service.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex h-full flex-col border border-border bg-card p-8 transition-colors hover:border-primary"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <Icon className="size-8 text-primary" aria-hidden />
      <h3 className="mt-6 text-lg font-bold uppercase tracking-[0.14em] text-foreground">{service.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <ul className="mt-6 space-y-2 border-t border-border pt-5">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span className="size-1 bg-primary" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
