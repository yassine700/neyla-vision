import { siteData } from "../../data/siteData";

export function ClientsMarquee() {
  const logos = [...siteData.references, ...siteData.references];
  return (
    <div className="relative overflow-hidden border-y border-border py-10">
      <div className="flex w-max animate-marquee items-center gap-12">
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-16 w-32 shrink-0 items-center justify-center"
          >
            <img
              src={logo.logo}
              alt={logo.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
