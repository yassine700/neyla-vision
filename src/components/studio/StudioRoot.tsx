import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const StudioApp = lazy(() => import("./StudioApp"));

function Loading() {
  return (
    <div className="grid h-dvh w-full place-items-center bg-neutral-950 text-sm text-neutral-400">
      Chargement du Studio…
    </div>
  );
}

export function StudioRoot() {
  return (
    <ClientOnly fallback={<Loading />}>
      <Suspense fallback={<Loading />}>
        <StudioApp />
      </Suspense>
    </ClientOnly>
  );
}
