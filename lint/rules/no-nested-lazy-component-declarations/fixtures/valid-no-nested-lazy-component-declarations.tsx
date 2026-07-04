import { lazy } from "react";
const Settings = lazy(() => import("./Settings"));
function Page() {
  return <Settings />;
}
