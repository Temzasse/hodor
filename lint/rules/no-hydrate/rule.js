// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Disallow legacy ReactDOM.hydrate.",
  message: "Use hydrateRoot instead of legacy ReactDOM.hydrate.",
  names: ["hydrate", "ReactDOM.hydrate"],
});
