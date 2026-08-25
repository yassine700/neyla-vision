import { motion } from "motion/react";
import { team } from "@/data/team";
import { SafeImage } from "./SafeImage";

export function TeamGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => (
        <motion.figure
          key={member.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
          className="group relative overflow-hidden border border-border bg-card"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <SafeImage
              src={member.photo}
              alt={`${member.name}, ${member.role}`}
              label={member.role}
              className="size-full grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">{member.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-primary">{member.role}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
