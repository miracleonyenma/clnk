<script setup lang="ts">
import useURLStore from "~/store/useURLStore";
import useUserStore from "~/store/useUserStore";

const accessToken = useCookie("access_token");
const refreshToken = useCookie("refresh_token");
const router = useRouter();
const userStore = useUserStore();
const urlsStore = useURLStore();

if (accessToken.value && refreshToken.value) {
  accessToken.value = "";
  refreshToken.value = "";
}
userStore.user = null;
urlsStore.setURLs([]);

setTimeout(() => {
  router.push("/");
}, 2000);
</script>
<template>
  <main>
    <section class="site-section">
      <div class="wrapper">
        <h1 class="text-center text-3xl font-bold lg:text-6xl">
          Logging out...
        </h1>
      </div>
    </section>
  </main>
</template>
