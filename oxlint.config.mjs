import hodor from "oxlint-config-hodor";

export default {
  jsPlugins: [hodor.jsPlugin],
  extends: [hodor.config],
  rules: {
    ...hodor.rules,
  },
  overrides: [
    {
      files: ["lint/hodor.js", "lint/index.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
