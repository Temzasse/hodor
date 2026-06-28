import hodor from "oxlint-preset-hodor";

export default {
  jsPlugins: [hodor.jsPlugin],
  extends: [hodor.config],
  rules: {
    ...hodor.rules,
  },
  overrides: [
    {
      files: ["lint/plugin.js", "lint/index.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
