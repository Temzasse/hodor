// @ts-nocheck
import { namingCallRule } from "../../utils.js";

export const rule = namingCallRule({
  description: "Name useId values with an Id suffix.",
  message: "Name useId values with an Id suffix.",
  calleeNames: ["useId", "React.useId"],
  pattern: /Id$/,
});
