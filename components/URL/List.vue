<script setup lang="ts">
import useURLStore from "~/store/useURLStore";
import getUrls from "~/utils/url/getUrls";
import LoaderIcon from "~/assets/icons/loader.svg";

const urlStore = useURLStore();

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
    // console.log({ value });

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
    // console.log({ value });
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
  // get urls from local storage
  const storedURLsString = localStorage.getItem("urls");
  if (storedURLsString) {
    const storedURLs = JSON.parse(storedURLsString);
    storedURLs.length > 0 && urlStore.setURLs(storedURLs);
  }

  data.refresh();
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore) {
      pagination.value.page += 1;
    }
  });
});

watch(
  () => urlStore.urls,
  (value) => {
    console.log({ value });
  },
  {
    deep: true,
  },
);
</script>
<template>
  <p v-if="urlStore.urls.length > 0" class="pb-12 text-center">
    <!-- number of urls -->
    {{ urlStore.urls.length }} code link{{
      urlStore.urls.length > 1 ? "s" : ""
    }}
  </p>
  <ul class="url-list">
    <li v-for="url in urlStore.urls" :key="url.id" class="relative">
      <URLCard :key="url.id + url.image" :id="url.id" :url="url" />
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
