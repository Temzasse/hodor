// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Disallow ReactDOM.flushSync.",
  message: "Avoid flushSync unless a narrow framework integration requires it.",
  names: ["flushSync", "ReactDOM.flushSync"],
});
