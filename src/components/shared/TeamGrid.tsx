import { motion } from "motion/react";

import { siteData } from "../../data/siteData";

export function TeamGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {siteData.team.map((member, i) => (
        <motion.figure
          key={member.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06 }}
          className="group overflow-hidden border border-border bg-card"
        >
          <div className="aspect-[3/4] overflow-hidden bg-secondary">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="p-5">
            <p className="font-display text-sm tracking-[0.14em] uppercase">{member.name}</p>
            <p className="mt-1 text-xs text-primary">{member.role ?? "Neyla Production"}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
