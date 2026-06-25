import reactTaste, { rules as reactRules } from "./react-taste.js";
import typescriptTaste, { rules as typescriptRules } from "./typescript-taste.js";

const plugins = {
  reactTaste,
  typescriptTaste,
};

export default plugins;
export { reactRules, reactTaste, typescriptRules, typescriptTaste };
