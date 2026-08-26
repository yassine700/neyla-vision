import { siteData } from "../../data/siteData";

export function ClientsMarquee() {
  const logos = [...siteData.references, ...siteData.references];
  return (
    <div className="relative overflow-hidden border-y border-border py-10">
      <div className="flex w-max animate-marquee items-center gap-16 [&>img]:self-center">
        {logos.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.logo}
            alt={logo.name}
            loading="lazy"
            className="h-12 max-w-[160px] shrink-0 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
