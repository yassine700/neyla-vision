import { motion } from "motion/react";

import { siteData } from "../../data/siteData";

export function LogoGrid() {
  return (
    <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
      {siteData.references.map((ref, i) => (
        <motion.div
          key={ref.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
          className="group flex h-32 items-center justify-center bg-background p-6 md:h-40 md:p-8"
        >
          <div className="flex h-16 w-32 items-center justify-center md:h-20 md:w-40">
            <img
              src={ref.logo}
              alt={ref.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
