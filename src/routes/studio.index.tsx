import { createFileRoute } from "@tanstack/react-router";

import { StudioRoot } from "../components/studio/StudioRoot";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Studio — Neyla Production" },
      { name: "description", content: "Espace de gestion du contenu Neyla Production." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioRoot,
});
