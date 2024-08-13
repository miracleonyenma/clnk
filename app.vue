<script setup lang="ts">
import { Toaster } from "vue-sonner";
const route = useRoute();
const metaTitle = (route.meta.title || "Home") as string;
const description = `QR Link is a minimal link shortner`;
const metaDescription = (route.meta.description || description) as string;

useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} | clnk`;
  },
  title: metaTitle,
  meta: [
    {
      name: "description",
      content: metaDescription,
      key: "description",
    },
    //Open Graph
    {
      key: "og-type",
      property: "og:type",
      content: "website",
    },
    {
      key: "og-url",
      property: "og:url",
      content: `https://clnk.netlify.app/`, // Update with OpenKids Africa's website URL
    },
    {
      key: "og-title",
      property: "og:title",
      content: metaTitle,
    },
    {
      key: "og-description",
      property: "og:description",
      content: metaDescription,
    },
    {
      key: "og-image",
      property: "og:image",
      content: `https://clnk.netlify.app/img/clnk-cover.png`, // Update with OpenKids Africa's image URL
    },
    //Twitter
    {
      key: "twitter-card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      key: "twitter-url",
      property: "twitter:url",
      content: `https://clnk.netlify.app/`, // Update with OpenKids Africa's website URL
    },
    {
      key: "twitter-title",
      property: "twitter:title",
      content: metaTitle,
    },
    {
      key: "twitter-description",
      property: "twitter:description",
      content: metaDescription,
    },
    {
      key: "twitter-image",
      property: "twitter:image",
      content: `https://clnk.netlify.app/img/clnk-cover.png`, // Update with OpenKids Africa's image URL
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&family=Brygada+1918:ital,wght@0,400..700;1,400..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Gupter:wght@400;500;700&family=Imbue:opsz,wght@10..100,100..900&family=Instrument+Serif:ital@0;1&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Oranienbaum&display=swap",
    },
  ],
  htmlAttrs: {
    // class: "dark",
  },
});
</script>
<template>
  <div>
    <Toaster richColors />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
