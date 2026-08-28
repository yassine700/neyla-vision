import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import { SectionHeading } from "../shared/SectionHeading";
import { fetchTeamMembers, teamFallback } from "../../lib/sanityTeam";

export function TeamSection() {
  const { data: members } = useQuery({
    queryKey: ["sanity", "teamMember"],
    queryFn: fetchTeamMembers,
    initialData: teamFallback,
  });

  if (!members.length) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Notre équipe"
          title="Les visages derrière Neyla"
          subtitle="Une équipe pluridisciplinaire : réalisation, image, son et stratégie de contenu."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => {
            const card = (
              <>
                <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 font-medium text-foreground">{member.name}</p>
                <p className="mt-1 text-sm text-neutral-400">
                  {member.role ?? "Neyla Production"}
                </p>
              </>
            );

            return (
              <motion.div
                key={`${member.name}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06 }}
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
          })}
        </div>
      </div>
    </section>
  );
}
