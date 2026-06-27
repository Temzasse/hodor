import { rules } from "./lint/built-in-taste-rules.js";

export default {
  jsPlugins: ["./lint/hodor.js"],
  rules: {
    ...rules.all,
    "hodor/no-positional-func-args": "error",
    "hodor/no-json-parse-type-assertion": "error",
    "hodor/no-react-fc": "error",
    "hodor/no-forward-ref": "error",
    "hodor/no-default-react-memoization": "error",
    "hodor/no-function-deps-in-effect": "error",
  },
};
