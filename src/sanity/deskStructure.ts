import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      S.listItem()
        .title("Configuration du Site")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Configuration du Site"),
        ),
      S.divider(),
      S.documentTypeListItem("serviceItem").title("Services"),
      S.documentTypeListItem("project").title("Réalisations"),
      S.documentTypeListItem("clientLogo").title("Logos Clients"),
      S.documentTypeListItem("teamMember").title("Notre Équipe"),
    ]);

export default deskStructure;
