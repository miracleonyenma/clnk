<script setup lang="ts">
import { toast } from "vue-sonner";
import type { URL } from "~/types/url";
import { useClipboard } from "~/composables/useClipboard";

const { copyToClipboard } = useClipboard();
const props = defineProps<{
  url: URL;
  id: string;
}>();

const handleCopy = () => {
  toast.promise(copyToClipboard(props.url.shortUrl), {
    loading: "Copying...",
    success: (data) => `Copied ${data} to clipboard`,
    error: (error) => `Failed to copy: ${error}`,
  });
};
</script>
<template>
  <div
    :class="`url-card group relative w-full hover:z-20`"
    :style="{
      // a random number between -15 degrees to 15 degrees
      '--tw-rotate': `${Math.random() * 20 - 10}deg`,
    }"
  >
    <div
      class="wrapper absolute flex w-full flex-col gap-4 rounded-2xl shadow-2xl"
    >
      <div
        class="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-inner shadow-white dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-700"
      >
        <ClientOnly>
          <div class="rounded-lg bg-white p-2">
            <QRCode :id="id" :data="url.shortUrl" :options="{}" />
          </div>
        </ClientOnly>

        <div
          class="flex max-h-0 flex-col gap-4 overflow-y-clip transition-all group-hover:max-h-[999px]"
        >
          <div class="flex flex-col pt-2">
            <div class="flex flex-wrap items-center justify-between gap-2 py-1">
              <h3
                class="break-all text-2xl font-semibold uppercase leading-none text-gray-800 dark:text-gray-100 lg:text-4xl"
              >
                {{ url.code }}
              </h3>
              <div class="action-cont inline-flex flex-wrap gap-1">
                <button @click="handleCopy" class="btn md">
                  <UIcon name="i-solar:copy-line-duotone" class="icon" />
                </button>
                <ShareDrawer>
                  <button class="btn md">
                    <UIcon name="i-solar:share-line-duotone" class="icon" />
                  </button>
                </ShareDrawer>
              </div>
            </div>
            <div class="flex flex-col">
              <ULink
                :to="url.shortUrl"
                target="_blank"
                class="break-all font-mono text-sm leading-none text-gray-500"
              >
                {{ url.shortUrl }}
              </ULink>
              <code class="truncate text-xs text-gray-400">{{ url.url }}</code>
            </div>
          </div>

          <div class="action-cont flex justify-between gap-4">
            <div class="action-group flex gap-2 pb-1">
              <button class="btn danger">
                <UIcon
                  name="i-solar:trash-bin-minimalistic-line-duotone"
                  class="icon"
                />
              </button>
              <button class="btn secondary">
                <UIcon name="i-solar:pen-line-duotone" class="icon" />
              </button>
            </div>
            <!-- <div class="action-group flex gap-2">
            <button class="btn">
              <UIcon name="i-solar:copy-line-duotone" class="icon" />
            </button>
            <button class="btn">
              <UIcon name="i-solar:share-line-duotone" class="icon" />
            </button>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
