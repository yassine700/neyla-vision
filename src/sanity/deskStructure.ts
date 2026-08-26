import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "heroSection", title: "Section Hero", icon: undefined },
  { id: "aboutSection", title: "Section À propos" },
  { id: "contactInfo", title: "Coordonnées" },
] as const;

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.id).documentId(s.id).title(s.title)),
      ),
      S.divider(),
      S.documentTypeListItem("serviceItem").title("Services"),
      S.documentTypeListItem("project").title("Réalisations"),
      S.documentTypeListItem("clientLogo").title("Logos Clients"),
    ]);

export default deskStructure;
