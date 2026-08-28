import { useQuery } from "@tanstack/react-query";

import { siteData } from "../../data/siteData";
import { fetchClientLogos } from "../../lib/sanityQueries";

export function ClientsMarquee() {
  const { data } = useQuery({
    queryKey: ["sanity", "clientLogos"],
    queryFn: fetchClientLogos,
    initialData: siteData.references,
    staleTime: 5 * 60_000,
  });

  const refs = data?.length ? data : siteData.references;
  const logos = [...refs, ...refs];

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
              decoding="async"
              className="h-10 w-auto max-w-[140px] object-contain grayscale opacity-70 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
