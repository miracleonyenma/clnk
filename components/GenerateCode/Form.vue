<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { toast } from "vue-sonner";
import createURL from "~/utils/url/createURL";
import LoaderIcon from "~/assets/icons/loader.svg";
import VueQrCode from "@chenfengyuan/vue-qrcode";
import useURLStore from "~/store/useURLStore";

const urlStore = useURLStore();
// const {addURL} = storeToRefs(urlStore);

const schema = z.object({
  url: z.string().url("Invalid URL"),
  // must be at least 3 characters long and only url safe characters
  code: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
});

type Schema = z.output<typeof schema>;

const form = ref();

const state = reactive({
  url: "",
  code: undefined,
});

const loading = ref<boolean>(false);

const handleGenerateCode = async (url: string, code?: string) => {
  try {
    const data: Schema = { url: state.url };
    state.code && (data.code = state.code);

    const response = await createURL({ url: state.url, code: state.code });
    console.log("⛑️⛑️⛑️⛑️⛑️ ~ response", response);

    return response;
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ error", error);

    throw error;
  }
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log("🚀🚀🚀🚀🚀🚀 ~ event", event);

  // Do something with data
  toast.promise(handleGenerateCode(event.data.url, event.data.code), {
    loading: () => {
      loading.value = true;
      return "Generating code...";
    },
    success: (data) => {
      console.log("🚀🚀🚀🚀🚀🚀 ~ data", data);
      const createdURL = data.data?.createUrl;
      console.log({ createdURL });

      createdURL?.code && urlStore.addURL(createdURL);
      return "Code generated successfully";
    },
    error: () => "Failed to generate code",
    finally: () => {
      loading.value = false;
    },
  });
};
</script>

<template>
  <div
    class="form-cont rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-inner shadow-white dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-800 lg:p-8"
  >
    <UForm
      :ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup name="url">
        <UInput
          v-model="state.url"
          type="text"
          placeholder="Enter your URL"
          class="form-input font-mono outline-none"
          input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
          icon="i-solar:link-minimalistic-bold-duotone"
        />
      </UFormGroup>

      <button :disabled="loading" class="btn primary w-full" type="submit">
        <span v-if="!loading"> Generate code </span>
        <LoaderIcon v-if="loading" class="icon animate-spin" />
      </button>
    </UForm>
  </div>
</template>
