// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    configPath: "~/tailwind.config.ts",
  },
  svgo: {
    defaultImport: "component",
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-svgo"],
});
