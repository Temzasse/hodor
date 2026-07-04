// @ts-nocheck
import { callNameRule } from "../../utils.js";

export const rule = callNameRule({
  description: "Avoid React captureOwnerStack outside narrow local debugging.",
  message: "Do not use captureOwnerStack in application code.",
  names: ["captureOwnerStack", "React.captureOwnerStack"],
});
