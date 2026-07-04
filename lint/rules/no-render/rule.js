// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Disallow legacy ReactDOM.render.",
  message: "Use createRoot instead of legacy ReactDOM.render.",
  names: ["render", "ReactDOM.render"],
});
