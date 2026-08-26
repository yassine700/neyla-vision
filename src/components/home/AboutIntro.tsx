import { Reveal } from "../shared/Reveal";
import logo from "../../assets/neyla-logo.png.asset.json";
import { useAboutContent } from "../../lib/sanityContent";

export function AboutIntro() {
  const { data: about } = useAboutContent();

  return (
    <section className="border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <Reveal className="flex justify-center md:justify-start">
          <img
            src={about.image ?? logo.url}
            alt="Neyla Production"
            className="w-full max-w-md md:max-w-lg"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label-eyebrow">{about.sectionTitle}</p>
          <blockquote className="mt-5 border-l-4 border-primary pl-6">
            <p className="text-base leading-relaxed md:text-lg">
              <span className="font-semibold text-foreground">{about.tagline}</span>{" "}
              <span className="text-muted-foreground">{about.description}</span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
