// @ts-nocheck
import { implicitSpreadPropRule } from "../../utils.js";

export const rule = implicitSpreadPropRule({
  description: "Spell out JSX key props instead of passing them through spreads.",
  message: "Spell out key directly on the JSX element instead of passing it through a spread.",
  propName: "key",
});
