<script setup lang="ts">
import useUserStore from "~/store/useUserStore";
import me from "~/utils/auth/me";

const useUser = useUserStore();

const { data, refresh } = useAsyncData("user", async () => {
  return await me({});
});

const user = data?.value?.data?.me;

user && useUser.setUser(user);

// console.log({ data });

onMounted(() => {
  refresh();
});
</script>
<template>
  <div>
    <SiteHeader />
    <slot />
  </div>
</template>
