<script setup lang="ts">
import useURLStore from "~/store/useURLStore";

const urlStore = useURLStore();
</script>
<template>
  <main class="site-main">
    <header class="site-section max-lg:pb-0">
      <div class="wrapper !py- flex flex-col gap-1 text-center">
        <h1 class="font-heading text-5xl font-medium lg:text-6xl 2xl:text-8xl">
          Create your own
          <span class="text-nowrap text-teal-600"> code links </span>
        </h1>
        <p class="mx-auto w-[70%] lg:text-xl">
          Shorten your URLs, and share them with others
        </p>
      </div>
    </header>
    <section :class="`site-section ${!urlStore.urls.length && '!py-0'}`">
      <div :class="`wrapper !max-w-6xl ${!urlStore.urls.length && '!py-0'}`">
        <URLList />
      </div>
    </section>
    <section class="site-section sticky bottom-0 z-40 !py-6">
      <div class="wrapper !py-0">
        <GenerateCodeForm />
      </div>
    </section>
  </main>
</template>
