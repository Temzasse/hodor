// @ts-check
import { rule as noDefaultReactMemoization } from "./rules/no-default-react-memoization/rule.js";
import { rule as noForwardRef } from "./rules/no-forward-ref/rule.js";
import { rule as noFunctionDepsInEffect } from "./rules/no-function-deps-in-effect/rule.js";
import { rule as noJsonParseTypeAssertion } from "./rules/no-json-parse-type-assertion/rule.js";
import { rule as noPositionalFuncArgs } from "./rules/no-positional-func-args/rule.js";
import { rule as noReactFc } from "./rules/no-react-fc/rule.js";
import { createPlugin } from "./utils.js";

export const rules = {
  "no-react-fc": noReactFc,
  "no-forward-ref": noForwardRef,
  "no-default-react-memoization": noDefaultReactMemoization,
  "no-function-deps-in-effect": noFunctionDepsInEffect,
  "no-positional-func-args": noPositionalFuncArgs,
  "no-json-parse-type-assertion": noJsonParseTypeAssertion,
};

const hodor = createPlugin({
  name: "hodor",
  rules,
});

export default hodor;
