<script setup lang="ts">
import { toast } from "vue-sonner";
import type { URL } from "~/types/url";
import { useClipboard } from "~/composables/useClipboard";
import deleteURL from "~/utils/url/deleteURL";
import useURLStore from "~/store/useURLStore";

const props = defineProps<{
  url: URL;
  id: string;
  mode?: "view" | "share";
}>();

const emit = defineEmits(["update-download"]);

const { copyToClipboard } = useClipboard();
const urlStore = useURLStore();
const isOpen = ref(false);
const state = reactive({
  code: "",
});

const options = computed(() => {
  const obj: { [key: string]: string } = {};
  props.url.image && (obj.image = props.url.image);
  return obj;
});

const handleCopy = () => {
  toast.promise(copyToClipboard(props.url.shortUrl), {
    loading: "Copying...",
    success: (data) => `Copied ${data} to clipboard`,
    error: (error) => `Failed to copy: ${error}`,
  });
};

const deleteUrl = async (id: string) => {
  try {
    const response = await deleteURL(id);
    return response;
  } catch (error) {
    throw error;
  }
};

const handleDeleteURL = () => {
  toast.promise(deleteUrl(props.url.id), {
    loading: "Deleting...",
    success: () => {
      urlStore.setURLs(urlStore.urls.filter((url) => url.id !== props.url.id));
      isOpen.value = false;
      return "Link deleted successfully";
    },
    error: () => "Failed to delete link",
  });
};
</script>
<template>
  <div
    :class="`url-card group relative w-full hover:z-50 hover:!rotate-0`"
    :style="{
      // a random number between -15 degrees to 15 degrees
      '--tw-rotate': `${props.mode !== 'share' && Math.random() * 20 - 10}deg`,
    }"
  >
    <div
      :class="`wrapper flex w-full flex-col gap-4 rounded-2xl shadow-2xl ${
        props.mode !== 'share' && 'absolute'
      }`"
    >
      <div
        class="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-inner shadow-white dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-700"
      >
        <ClientOnly>
          <div class="rounded-lg bg-white p-2">
            <QRCode :id="id" :data="url.shortUrl" :options="options" />
          </div>
        </ClientOnly>

        <div
          :class="`flex flex-col gap-4 overflow-y-clip transition-all group-hover:max-h-[999px] ${
            props.mode === 'share' ? 'max-h-[999px]' : 'max-h-[0]'
          }`"
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
                  <UIcon name="i-solar:copy-bold-duotone" class="icon" />
                </button>
                <ShareDrawer v-if="mode !== 'share'" :url="url">
                  <button class="btn md">
                    <UIcon name="i-solar:share-bold-duotone" class="icon" />
                  </button>
                </ShareDrawer>
              </div>
            </div>
            <div class="flex flex-col text-left">
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

          <div
            v-if="mode !== 'share'"
            class="action-cont flex justify-between gap-4"
          >
            <div class="action-group flex gap-2 pb-1">
              <button @click="() => (isOpen = true)" class="btn danger">
                <UIcon
                  name="i-solar:trash-bin-minimalistic-bold-duotone"
                  class="icon"
                />
              </button>
              <URLEditDrawer :url="url">
                <button class="btn secondary">
                  <UIcon name="i-solar:pen-bold-duotone" class="icon" />
                </button>
              </URLEditDrawer>
            </div>
            <!-- <div class="action-group flex gap-2">
            <button class="btn">
              <UIcon name="i-solar:copy-bold-duotone" class="icon" />
            </button>
            <button class="btn">
              <UIcon name="i-solar:share-bold-duotone" class="icon" />
            </button>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold lg:text-2xl">
            Are you sure you want to delete this link?
          </h3>
          <button class="btn ghost" @click="() => (isOpen = false)">
            <UIcon name="i-solar:close-circle-bold-duotone" class="icon" />
          </button>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <p class="text-gray-600 dark:text-gray-400">
          This action cannot be undone. This will permanently delete the link
          and its data.
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          Please type <code>{{ url.code }}</code> to confirm.
        </p>
        <UInput
          v-model="state.code"
          type="text"
          placeholder="Enter the code to confirm"
          class="form-input font-mono outline-none"
          input-class="rounded-none !px-4 border-none bg-transparent !ring-0 shadow-none"
        />
      </div>

      <template #footer>
        <div class="flex justify-end gap-4">
          <button @click="() => (isOpen = false)" class="btn">Cancel</button>
          <button
            :disabled="state.code !== url.code"
            @click="handleDeleteURL"
            class="btn danger"
          >
            Delete
          </button>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
