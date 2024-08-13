<script setup lang="ts">
import useUserStore from "~/store/useUserStore";

const userStore = useUserStore();
</script>
<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-b-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
  >
    <div
      class="wrapper mx-auto flex max-w-4xl items-center justify-between p-4"
    >
      <NuxtLink to="/">
        <SiteLogo />
      </NuxtLink>

      <div class="flex items-center justify-between gap-4">
        <nav>
          <ul class="flex items-center justify-end gap-4 text-sm font-semibold">
            <template v-if="userStore.user?.id">
              <ProfileDropDown />
            </template>
            <template v-else>
              <li class="font-heading">
                <NuxtLink href="/login"> Login </NuxtLink>
              </li>
              <li class="font-heading">
                <NuxtLink href="/register"> Sign Up </NuxtLink>
              </li>
            </template>
          </ul>
        </nav>

        <ThemeButton />
      </div>
    </div>
  </header>
</template>
