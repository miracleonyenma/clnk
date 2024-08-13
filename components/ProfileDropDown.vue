<script setup lang="ts">
import useUserStore from "~/store/useUserStore";

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
  router.push("/logout");
};

const items = [
  [
    {
      // label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  // [
  //   {
  //     label: "Settings",
  //     icon: "i-heroicons-cog-8-tooth",
  //   },

  // ],
  // [
  //   {
  //     label: "Documentation",
  //     icon: "i-heroicons-book-open",
  //   },
  //   {
  //     label: "Changelog",
  //     icon: "i-heroicons-megaphone",
  //   },
  //   {
  //     label: "Status",
  //     icon: "i-heroicons-signal",
  //   },
  // ],
  [
    {
      label: "Sign out",
      icon: "i-solar:logout-2-bold-duotone",
      click: handleLogout,
    },
  ],
];
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ userStore.user?.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
      />
    </template>
  </UDropdown>
</template>
