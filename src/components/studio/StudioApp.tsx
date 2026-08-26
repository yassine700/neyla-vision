import { Studio } from "sanity";

import config from "../../../sanity.config";

export default function StudioApp() {
  return (
    <div className="fixed inset-0 z-[999] h-dvh w-screen">
      <Studio config={config} />
    </div>
  );
}
