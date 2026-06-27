const error = "error";

const reactRuleEntries = [
  ["react/jsx-handler-names", error],
  ["react/jsx-pascal-case", error],
  ["react/jsx-props-no-spreading", error],
];

const typescriptRuleEntries = [
  ["typescript/consistent-type-definitions", [error, "type"]],
  [
    "typescript/consistent-type-assertions",
    [
      error,
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
  ],
];

const basicRuleEntries = [
  ["import/no-default-export", error],
  ["no-else-return", error],
  ["func-style", [error, "declaration"]],
  ["oxc/no-barrel-file", error],
  ["no-empty", error],
  ["no-useless-catch", error],
  ["preserve-caught-error", error],
  ["no-await-in-loop", error],
  ["oxc/no-accumulating-spread", error],
  ["unicorn/no-array-reduce", error],
];

export const rules = {
  basic: Object.fromEntries(basicRuleEntries),
  react: Object.fromEntries(reactRuleEntries),
  typescript: Object.fromEntries(typescriptRuleEntries),
  all: Object.fromEntries([...basicRuleEntries, ...reactRuleEntries, ...typescriptRuleEntries]),
};
