// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Disallow useFormState.",
  message: "Use the current form state API instead of useFormState.",
  names: ["useFormState", "ReactDOM.useFormState"],
});
