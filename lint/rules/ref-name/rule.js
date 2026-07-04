// @ts-nocheck
import { namingCallRule } from "../../utils.js";

export const rule = namingCallRule({
  description: "Name ref values with a Ref suffix.",
  message: "Name ref values with a Ref suffix.",
  calleeNames: ["useRef", "React.useRef", "createRef", "React.createRef"],
  pattern: /Ref$/,
});
