import { rules } from "./src/built-in-taste-rules.js";

export default {
  jsPlugins: ["./src/react-taste.js", "./src/typescript-taste.js"],
  rules: {
    ...rules.all,
    "typescript-taste/no-boolean-flag-parameters": "error",
    "typescript-taste/prefer-named-object-parameters": "error",
    "typescript-taste/no-json-parse-type-assertion": "error",
    "react-taste/no-react-fc": "error",
    "react-taste/no-forward-ref": "error",
    "react-taste/no-default-react-memoization": "error",
    "react-taste/no-function-deps-in-effect": "error",
  },
};
