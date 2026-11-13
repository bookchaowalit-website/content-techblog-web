import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  { ignores: [
      "storybook-static/**","node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"] },
];
export default eslintConfig;
