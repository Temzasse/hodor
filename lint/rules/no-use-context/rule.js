// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Prefer project-specific context hooks over useContext.",
  message: "Use a project-specific context hook instead of useContext.",
  names: ["useContext", "React.useContext"],
});
