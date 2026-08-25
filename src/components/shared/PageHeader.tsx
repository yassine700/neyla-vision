import { motion } from "motion/react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-background pb-16 pt-36 sm:pt-44">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 15% 0%, oklch(0.577 0.245 27.325 / 0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </header>
  );
}
