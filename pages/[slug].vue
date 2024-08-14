<script setup lang="ts">
import getUrl from "~/utils/url/getUrl";
import LoaderIcon from "~/assets/icons/loader.svg";

const route = useRoute();
const { slug } = route.params;
const handleGetUrl = async () => {
  try {
    const data = await getUrl({
      code: slug as string,
    });
    const url = data.data?.getUrl.url;
    if (!url) throw new Error("URL not found");
    return navigateTo(url, {
      external: true,
    });
  } catch (error) {
    console.error(error);
    return navigateTo("/", {
      replace: true,
    });
  }
};

handleGetUrl();
definePageMeta({
  layout: "root",
});
</script>
<template>
  <div class="flex h-screen w-full items-center justify-center">
    <LoaderIcon class="icon animate-spin" />
  </div>
</template>
