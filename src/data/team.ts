export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

/**
 * TEMPLATE — déposez les portraits dans /public/team/ et mettez à jour les noms.
 */
export const team: TeamMember[] = [
  { id: "t-01", name: "Prénom Nom", role: "Directeur de production", photo: "/team/team-01.jpg" },
  { id: "t-02", name: "Prénom Nom", role: "Réalisateur", photo: "/team/team-02.jpg" },
  { id: "t-03", name: "Prénom Nom", role: "Directrice artistique", photo: "/team/team-03.jpg" },
  { id: "t-04", name: "Prénom Nom", role: "Chef opérateur", photo: "/team/team-04.jpg" },
  { id: "t-05", name: "Prénom Nom", role: "Motion designer", photo: "/team/team-05.jpg" },
  { id: "t-06", name: "Prénom Nom", role: "Responsable marketing digital", photo: "/team/team-06.jpg" },
];
