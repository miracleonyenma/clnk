// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    apiKey: process.env.API_KEY,
    apiURL: process.env.API_URL,
    graphqlURL: process.env.GRAPHQL_URL,
  },
  tailwindcss: {
    configPath: "~/tailwind.config.ts",
  },
  svgo: {
    defaultImport: "component",
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: "",
  },
  modules: [
    "nuxt-svgo",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/fonts"
  ],
});