<script setup lang="ts">
import LoaderIcon from "~/assets/icons/loader.svg";

const route = useRoute();
const { slug } = route.params;

navigateTo(`http://localhost:8000/${slug}`, {
  external: true,
});

definePageMeta({
  layout: "root",
});
</script>
<template>
  <div class="flex h-screen w-full items-center justify-center">
    <LoaderIcon class="icon animate-spin" />
  </div>
</template>
