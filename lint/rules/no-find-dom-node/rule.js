// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Disallow ReactDOM.findDOMNode.",
  message: "Use refs instead of ReactDOM.findDOMNode.",
  names: ["findDOMNode", "ReactDOM.findDOMNode"],
});
