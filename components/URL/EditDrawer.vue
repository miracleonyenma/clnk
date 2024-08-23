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

import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import createURL from "~/utils/url/createURL";
import VueQrCode from "@chenfengyuan/vue-qrcode";
import useURLStore from "~/store/useURLStore";
import updateURL from "~/utils/url/updateURL";
import LoaderIcon from "~/assets/icons/loader.svg";

const props = defineProps<{
  open?: boolean;
  url: URL;
}>();

const open = ref(props.open);
const contRef = ref<HTMLElement | null>(null);
const loading = ref<boolean>(false);

const urlStore = useURLStore();
const matchedUrl = ref(urlStore.urls.find((url) => url.id === props.url.id));
// const {addURL} = storeToRefs(urlStore);

const schema = z.object({
  url: z.string().url("Invalid URL"),
  shortUrl: z.string().url("Invalid URL"),
  image: z.string().url("Invalid URL").optional(),
  shorten: z.boolean().optional(),
});

type Schema = z.output<typeof schema>;

const form = ref();

const state = reactive({
  url: props.url?.url,
  shortUrl: props.url?.shortUrl,
  image: "",
  shorten: undefined,
});

const handleUpdateUrl = async (id: string) => {
  try {
    const data: Schema = {
      url: state.url,
      shortUrl: state.shortUrl,
      image: state.image,
    };

    const response = await updateURL({
      id: id,
      url: data.url,
      image: data.image,
      shortUrl: data.shortUrl,
    });

    console.log("😑😑😑😑😑😑 ~ response", response);

    return response;
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ error", error);

    throw error;
  }
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log("🚀🚀🚀🚀🚀🚀 ~ event", event);
  const newURL: URL = {
    id: props.url.id,
    image: event.data.image,
    code: props.url.code,
    shortUrl: event.data.shortUrl,
    url: event.data.url,
    user: props.url.user,
  };

  console.log("newURL", { newURL });

  urlStore.setURL(newURL);
  matchedUrl.value = newURL;

  toast.promise(handleUpdateUrl(props.url.id), {
    loading: () => {
      loading.value = true;
      return "Updating link...";
    },
    success: (data) => {
      // console.log("🚀🚀🚀🚀🚀🚀 ~ data", data);
      const updatedURL = data.data?.updateUrl;
      // console.log({ updatedURL });

      updatedURL?.code && urlStore.setURL(updatedURL);
      return "Link updated successfully";
    },
    error: () => "Failed to update link",
    finally: () => {
      loading.value = false;
    },
  });

  // Do something with data
};
</script>

<template>
  <DrawerRoot v-model:open="open">
    <DrawerTrigger> <slot> Open </slot> </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 z-[90] bg-black/40" />
      <DrawerContent
        class="fixed bottom-0 left-0 right-0 z-[91] mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-white dark:bg-gray-800"
      >
        <div
          class="mx-auto my-4 h-1.5 w-12 flex-shrink-0 flex-col rounded-full bg-gray-300 dark:bg-gray-700"
        />

        <DrawerTitle
          class="flex justify-center bg-transparent p-4 text-center text-xl lg:text-4xl"
        >
          Edit your code link
        </DrawerTitle>
        <div class="h-[calc(100%-12rem)] flex-1 overflow-y-auto p-6">
          <div
            class="mx-auto flex max-w-md flex-col items-center gap-2 text-center"
          >
            <!-- <UIcon name="i-solar:letter-bold-duotone" class="h-32 w-32" /> -->
            <div ref="contRef" class="cont w-full p-12">
              <URLCard :id="url.id + 'edit'" :url="url" mode="share" />
            </div>
          </div>
          <div class="mx-auto w-full max-w-xl">
            <UForm
              :ref="form"
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="onSubmit"
            >
              <div class="form-group flex flex-wrap gap-4">
                <UFormGroup name="url" class="grow">
                  <UInput
                    v-model="state.url"
                    type="text"
                    placeholder="Enter your destination URL"
                    class="form-input font-mono outline-none"
                    input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
                    icon="i-solar:link-minimalistic-bold-duotone"
                  />
                </UFormGroup>
                <UFormGroup v-if="!state.shorten" name="shortUrl" class="grow">
                  <UInput
                    v-model="state.shortUrl"
                    type="text"
                    placeholder="Enter your display URL"
                    class="form-input font-mono outline-none"
                    input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
                    icon="i-solar:link-minimalistic-bold-duotone"
                  />
                </UFormGroup>
              </div>
              <UFormGroup name="image">
                <UInput
                  v-model="state.image"
                  type="text"
                  placeholder="Enter your image URL"
                  class="form-input font-mono outline-none"
                  input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
                  icon="i-solar:link-minimalistic-bold-duotone"
                />
              </UFormGroup>
              <UFormGroup name="checkbox">
                <UCheckbox v-model="state.shorten" label="Shorten URL" />
              </UFormGroup>

              <button
                :disabled="loading"
                class="btn primary w-full"
                type="submit"
              >
                <span v-if="!loading"> Edit code </span>
                <LoaderIcon v-if="loading" class="icon animate-spin" />
              </button>
            </UForm>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
