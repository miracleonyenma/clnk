<script setup lang="ts">
useSeoMeta({
  title: "Log in",
  description: "Log in to your account",
});
</script>
<template>
  <main>
    <section class="site-section">
      <div class="wrapper">
        <header class="mb-12">
          <div class="wrapper">
            <h1 class="text-2xl font-bold lg:text-6xl">Log in</h1>
          </div>
        </header>

        <AuthForm type="login" />
      </div>
    </section>
  </main>
</template>
