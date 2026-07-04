// @ts-nocheck
import { namingCallRule } from "../../utils.js";

export const rule = namingCallRule({
  description: "Name React context objects with a Context suffix.",
  message: "Name React context objects with a Context suffix.",
  calleeNames: ["createContext", "React.createContext"],
  pattern: /Context$/,
});
