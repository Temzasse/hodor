// hodor-test expect-message: module scope
import { lazy } from "react";
function Page() {
  const Settings = lazy(() => import("./Settings"));
  return <Settings />;
}
