// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Prefer useRef over createRef.",
  message: "Prefer useRef over createRef.",
  names: ["createRef", "React.createRef"],
});
