import { motion } from "motion/react";
import { logos } from "@/data/logos";
import { SafeImage } from "./SafeImage";

export function LogoGrid() {
  return (
    <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
          className="group flex h-36 items-center justify-center bg-card p-8"
        >
          <div className="h-full w-full opacity-55 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0">
            <SafeImage src={logo.src} alt={logo.name} label={logo.name} className="size-full" imgClassName="object-contain" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
