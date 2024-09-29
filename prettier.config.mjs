/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    "^(next/(.*)$)|^(next$)|^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^(.+)/",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
