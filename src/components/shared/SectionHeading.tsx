import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="label-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}
