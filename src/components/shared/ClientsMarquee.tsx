import { logos } from "@/data/logos";
import { SafeImage } from "./SafeImage";

export function ClientsMarquee() {
  const row = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden border-y border-border py-10">
      <div className="flex w-max animate-marquee items-center gap-16">
        {row.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="h-12 w-32 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
            <SafeImage
              src={logo.src}
              alt={logo.name}
              label={logo.name}
              className="size-full"
              imgClassName="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
