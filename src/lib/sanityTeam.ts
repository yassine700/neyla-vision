import { sanityClient, urlFor } from "./sanity";
import { siteData } from "../data/siteData";

export interface TeamMemberContent {
  name: string;
  role?: string | undefined;
  photo: string;
  linkedin?: string | undefined;
}

export const teamFallback: TeamMemberContent[] = siteData.team.map((member) => ({
  name: member.name,
  role: member.role ?? undefined,
  photo: member.image,
}));

const TEAM_QUERY = `*[_type == "teamMember"] | order(orderAsc asc){ name, role, photo, linkedin }`;

export async function fetchTeamMembers(): Promise<TeamMemberContent[]> {
  try {
    const docs = await sanityClient.fetch<
      Array<{ name?: string; role?: string; photo?: unknown; linkedin?: string }>
    >(TEAM_QUERY);
    if (!docs?.length) return teamFallback;
    const mapped = docs
      .filter((doc) => Boolean(doc.name && doc.photo))
      .map((doc) => ({
        name: doc.name ?? "",
        role: doc.role ?? undefined,
        photo: urlFor(doc.photo as never)
          .format("webp")
          .width(600)
          .height(600)
          .quality(80)
          .fit("crop")
          .url(),
        linkedin: doc.linkedin ?? undefined,
      }));
    return mapped.length ? mapped : teamFallback;
  } catch {
    return teamFallback;
  }
}
