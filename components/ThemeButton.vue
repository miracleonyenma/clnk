<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <button @click="isDark = !isDark" aria-label="Theme" class="btn ghost">
      <UIcon
        :name="
          isDark
            ? 'i-solar:moon-stars-bold-duotone'
            : 'i-solar:sun-bold-duotone'
        "
        class="icon"
      />
    </button>
    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>
