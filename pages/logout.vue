<script setup lang="ts">
import useURLStore from "~/store/useURLStore";
import useUserStore from "~/store/useUserStore";

const router = useRouter();
const userStore = useUserStore();
const urlsStore = useURLStore();

const handleLogout = async () => {
  const res = await fetch("/api/logout");
  const data = await res.json();

  setTimeout(() => {
    router.push("/");
    userStore.user = null;
    urlsStore.setURLs([]);
    useCookie("access_token", {
      maxAge: 0,
      expires: new Date(),
    });
    useCookie("refresh_token", {
      maxAge: 0,
      expires: new Date(),
    });
  }, 1000);
};

handleLogout();
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
