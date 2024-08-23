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
  image: z.string().url("Invalid URL").optional().or(z.literal("")),
  shorten: z.boolean().optional(),
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
  shortUrl: "",
  image: undefined,
  shorten: true,
});

const loading = ref<boolean>(false);
const showOptions = ref<boolean>(false);

const handleGenerateCode = async (input: {
  url: string;
  code?: string;
  image?: string;
  shorten?: boolean;
}) => {
  try {
    const data: Schema = {
      url: input.url,
      image: input.image,
      shorten: input.shorten,
    };
    state.code && (data.code = state.code);

    const response = await createURL(data);
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
  toast.promise(
    handleGenerateCode({
      url: event.data.url,
      image: event.data.image,
      shorten: event.data.shorten,
    }),
    {
      loading: () => {
        loading.value = true;
        return "Generating code...";
      },
      success: (data) => {
        // console.log("🚀🚀🚀🚀🚀🚀 ~ data", data);
        const createdURL = data.data?.createUrl;
        // console.log({ createdURL });

        createdURL?.code && urlStore.addURL(createdURL);
        state.url = "";
        return "Code generated successfully";
      },
      error: () => "Failed to generate code",
      finally: () => {
        loading.value = false;
      },
    },
  );
};
</script>

<template>
  <div
    class="form-cont sticky top-4 rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-inner shadow-white dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-800 lg:p-8"
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
      <template v-if="showOptions">
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
      </template>

      <div class="action-cont flex flex-wrap gap-2">
        <button @click="showOptions = !showOptions" type="button" class="btn">
          <UIcon name="i-solar:settings-bold-duotone" class="icon" />
        </button>
        <button :disabled="loading" class="btn primary grow" type="submit">
          <span v-if="!loading"> Generate code </span>
          <LoaderIcon v-if="loading" class="icon animate-spin" />
        </button>
      </div>
    </UForm>
  </div>
</template>
