import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { SectionHeading } from "../shared/SectionHeading";
import { fetchTeamMembers, teamFallback, type TeamMemberContent } from "../../lib/sanityTeam";
import { useInView } from "../../hooks/use-in-view";

function TeamCard({ member, index }: { member: TeamMemberContent; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  const card = (
    <>
      <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className={`size-full object-cover transition-all duration-700 ease-out group-hover:scale-105 md:duration-500 md:grayscale md:group-hover:grayscale-0 ${
            inView ? "grayscale-0 opacity-100" : "grayscale opacity-80"
          } md:grayscale md:opacity-80 md:group-hover:opacity-100`}
        />
      </div>
      <p className="mt-4 font-medium text-foreground">{member.name}</p>
      <p className="mt-1 text-sm text-neutral-400">{member.role ?? "Neyla Production"}</p>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      className="group"
    >
      {member.linkedin ? (
        <a href={member.linkedin} target="_blank" rel="noreferrer noopener">
          {card}
        </a>
      ) : (
        card
      )}
    </motion.div>
  );
}

export function TeamSection({
  limit,
  showCta = false,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const { data: members } = useQuery({
    queryKey: ["sanity", "teamMember"],
    queryFn: fetchTeamMembers,
    initialData: teamFallback,
  });

  if (!members.length) return null;

  const displayed = limit ? members.slice(0, limit) : members;

  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Notre équipe"
          title="Les visages derrière Neyla"
          subtitle="Une équipe pluridisciplinaire : réalisation, image, son et stratégie de contenu."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} index={i} />
          ))}
        </div>
        {showCta ? (
          <div className="mt-12 flex justify-center">
            <Link
              to="/equipe"
              className="inline-flex items-center gap-2 border border-border px-7 py-4 font-display text-xs tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Voir toute l'équipe <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
