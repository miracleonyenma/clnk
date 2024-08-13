<script setup lang="ts">
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  DrawerTitle,
} from "vaul-vue";
import { toast } from "vue-sonner";
import type { URL } from "~/types/url";

const props = defineProps<{
  open?: boolean;
  url: URL;
}>();

const { $htmlToImage } = useNuxtApp();

const { share } = useShare();
const { copyToClipboard } = useClipboard();
const open = ref(props.open);
const contRef = ref<HTMLElement | null>(null);
const loading = ref<boolean>(false);

const handleConvertToImage = async () => {
  const cont = contRef.value;
  console.log("🚀🚀🚀🚀🚀🚀 ~ cont", cont);

  if (!cont) return;

  $htmlToImage.toBlob(cont).then((blob) => {
    console.log("🚀🚀🚀🚀🚀🚀 ~ blob", blob);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clnk-share.png";
    a.click();

    URL.revokeObjectURL(url);
  });
};

const handleCopy = () => {
  toast.promise(copyToClipboard(props.url.shortUrl), {
    loading: "Copying...",
    success: (data) => `Copied ${data} to clipboard`,
    error: (error) => `Failed to copy: ${error}`,
  });
};

const shareCode = async () => {
  if (!contRef.value) return;
  try {
    const blob = await $htmlToImage.toBlob(contRef.value);
    if (!blob) return;
    const file = new File([blob], "clnk-share.png", { type: blob.type });
    return share({
      title: props.url.code,
      text: `Check out my code link: ${props.url.code}`,
      url: props.url.shortUrl,
      files: [file],
    });
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ error", error);
    throw error;
  }
};

const handleShareCode = () =>
  toast.promise(shareCode, {
    loading: () => {
      loading.value = true;
      return "Sharing code...";
    },
    success: () => "Code shared successfully",
    error: (error) => {
      handleCopy();

      return `Failed to share code: ${error}`;
    },
    finally: () => {
      loading.value = false;
    },
  });
</script>

<template>
  <DrawerRoot v-model:open="open">
    <DrawerTrigger> <slot> Open </slot> </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-black/40" />
      <DrawerContent
        class="fixed bottom-0 left-0 right-0 z-[50] mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-white dark:bg-gray-800"
      >
        <div
          class="mx-auto mb-8 mt-4 h-1.5 w-12 flex-shrink-0 flex-col rounded-full bg-gray-300 dark:bg-gray-700"
        />

        <DrawerTitle
          class="flex justify-center bg-transparent p-4 text-center text-xl lg:text-4xl"
        >
          Share your code link
        </DrawerTitle>
        <div class="flex-1 rounded-t-[10px] p-6">
          <div
            class="mx-auto flex max-w-md flex-col items-center gap-2 text-center"
          >
            <!-- <UIcon name="i-solar:letter-bold-duotone" class="h-32 w-32" /> -->
            <div ref="contRef" class="cont w-full p-12">
              <URLCard :id="url.id + 'share'" :url="url" mode="share" />
            </div>
          </div>
          <div class="action-cont mx-auto flex max-w-md justify-center gap-4">
            <button @click="handleConvertToImage" class="btn primary">
              <UIcon name="i-solar:download-bold-duotone" class="icon" />
            </button>
            <button @click="handleShareCode" class="btn primary">
              <UIcon name="i-solar:share-bold-duotone" class="icon" />
            </button>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
