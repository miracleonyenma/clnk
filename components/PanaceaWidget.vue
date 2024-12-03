<script lang="ts" setup>
import { PanaceaSDK } from "@trypanacea/sdk";
import useUserStore from "~/store/useUserStore";
const userStore = useUserStore();

watch(
  () => userStore.user,
  () => {
    console.log(
      "🚀 ~ file: PanaceaWidget.vue ~ line 10 ~ userStore.user",
      userStore.user,
    );
    PanaceaSDK.initPanacea({
      apiKey:
        "088eaa95c3758501236a9a9ed12fe0053c32abdc548381668b6e803022479a8f",
      appKey:
        "f9a9ddeea7ff5aedecaabb577a0c56491e4fb7ad3c4d16d2db775ec7f1c2607e",
      settings: {
        customLauncherSelector: ".panacea-widget",
        firstName: userStore.user?.name,
        email: userStore.user?.email,
      },
    });
  },
);
</script>
<template>
  <div class="panacea-widget"></div>
</template>
