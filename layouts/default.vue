<script setup lang="ts">
import useUserStore from "~/store/useUserStore";
import me from "~/utils/auth/me";

const route = useRoute();
const useUser = useUserStore();

const { data, refresh } = useAsyncData("user", async () => {
  return await me({});
});

const user = data?.value?.data?.me;

user && useUser.setUser(user);

// console.log({ data });

watch(
  () => route.path,
  () => {
    console.log(
      "🚀 ~ file: default.vue ~ line 10 ~ route.fullPath",
      route.fullPath,
    );

    if (user?.id) return;
    refresh();
  },
);

watch(
  () => data.value && data.value.data,
  () => {
    if (data.value?.data?.me) {
      useUser.setUser(data.value.data.me);
    }
  },
);

onMounted(() => {
  refresh();
});
</script>
<template>
  <div>
    <SiteHeader />
    <slot />
    <PanaceaWidget />
  </div>
</template>
