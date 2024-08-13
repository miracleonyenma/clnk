<script setup lang="ts">
import useURLStore from "~/store/useURLStore";
import getUrls from "~/utils/url/getUrls";
import LoaderIcon from "~/assets/icons/loader.svg";

const urlStore = useURLStore();
const { urls } = storeToRefs(urlStore);

const pagination = ref({
  page: 1,
  limit: 4,
});
const hasMore = ref(true);
const loadMoreEl = ref<HTMLElement | null>(null);

const data = await useAsyncData(
  "urls",
  () =>
    getUrls({
      pagination: pagination.value,
    }),
  {
    watch: [pagination],
  },
);

const fetchedUrls = data.data.value?.data?.getUrls.data;

if (fetchedUrls) {
  urlStore.setURLs(fetchedUrls);
}

const observer = ref<IntersectionObserver | null>(null);

watch(
  () => pagination.value,
  (value) => {
    console.log({ value });

    data.refresh();
  },
  { deep: true },
);

watch(
  () => loadMoreEl.value,
  (value) => {
    if (!observer.value) return;

    if (value) {
      observer?.value.observe(value);
    }
  },
);

watch(
  () => data.data.value?.data,
  (value) => {
    console.log({ value });
    if (!observer.value) return;
    urlStore.addURLs(value?.getUrls?.data || []);
    // check if there's more data to load
    const hasMoreData =
      (value?.getUrls.meta.page || 1) < (value?.getUrls?.meta?.pages || 1);
    hasMore.value = hasMoreData;
    if (!hasMoreData && loadMoreEl.value) {
      observer.value.unobserve(loadMoreEl.value);
    }
  },
  {
    deep: true,
  },
);

onMounted(() => {
  data.refresh();
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore) {
      console.log("intersecting");

      pagination.value.page += 1;
    }
  });
});
</script>
<template>
  <ul
    class="grid gap-4 px-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4"
  >
    <li v-for="url in urls" :key="url.id" class="relative">
      <URLCard :id="url.id" :url="url" />
    </li>
  </ul>
  <div
    v-if="(data.data.value?.data?.getUrls?.data?.length || 0) > 0 && hasMore"
    ref="loadMoreEl"
    class="load-more flex w-full justify-center py-16"
  >
    <LoaderIcon class="icon animate-spin dark:text-gray-200" />
  </div>
</template>
