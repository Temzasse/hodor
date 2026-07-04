// @ts-nocheck
import { implicitSpreadPropRule } from "../../utils.js";

export const rule = implicitSpreadPropRule({
  description: "Spell out JSX ref props instead of passing them through spreads.",
  message: "Spell out ref directly on the JSX element instead of passing it through a spread.",
  propName: "ref",
});
