import { Reveal } from "../shared/Reveal";
import logo from "../../assets/neyla-logo.png.asset.json";

export function AboutIntro() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-4xl px-5 py-20 text-center md:py-28">
        <Reveal className="flex justify-center">
          <img src={logo.url} alt="Neyla Production" className="w-full max-w-lg md:max-w-2xl" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label-eyebrow mt-12">À propos</p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Experts de l’image et créateurs de contenus audiovisuels percutants, nous mettons notre
            expertise technique et artistique au service de vos projets. Notre savoir-faire
            s’adresse à une clientèle diversifiée : Entreprises (Corporate), Enseignes, Marques,
            Institutions, Associations, Artistes, ou encore Particuliers. Que ce soit pour des
            productions vidéo, des shootings ou la création de contenus digitaux sur mesure, nous
            vous accompagnons à chaque étape du processus. Notre équipe s’engage à concevoir des
            contenus visuels qui captivent, inspirent et valorisent votre message, avec créativité,
            exigence et professionnalisme.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
