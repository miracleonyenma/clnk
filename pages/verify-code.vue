<script setup lang="ts">
import LoaderIcon from "~/assets/icons/loader.svg";
import { PinInputInput, PinInputRoot } from "radix-vue";
import { toast } from "vue-sonner";
import verifyOTP from "~/utils/auth/verifyOTP";

const route = useRoute();
const router = useRouter();
const email = route.query.email as string;

if (!email) router.push("/register");

const loading = ref(false);
const value = ref<string[]>([]);
const canProceed = ref(false);
const code = ref<string>("");

const handleComplete = async (event: string[]) => {
  console.log("🚀🚀🚀🚀🚀🚀 ~ event", event);
  canProceed.value = event.length == 6;
  code.value = event.join("");
};

const handleVerifyOTP = async () => {
  if (!email || !code) return;
  toast.promise(
    verifyOTP({
      email: email,
      otp: code.value,
    }),
    {
      loading: () => {
        loading.value = true;
        return "Verifying...";
      },
      success: (data) => {
        console.log("💽💽💽💽💽", data);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return "Your email has been verified, proceed to login";
      },
      error: (error) => {
        return `${error}`;
      },
      finally: () => {
        loading.value = false;
      },
    },
  );
};

useSeoMeta({
  title: "Verify Email",
  description: "Verify your email address",
});
</script>
<template>
  <main class="site-main">
    <section class="site-section pb-4">
      <div class="wrapper flex flex-col items-center gap-1 text-center">
        <h1 class="text-3xl lg:text-5xl">Verify your email address</h1>
        <p>
          Enter the code sent to <strong> {{ email }} below </strong>
        </p>
      </div>
    </section>
    <section class="site-section pt-0">
      <div class="wrapper">
        <div class="flex flex-col items-center justify-center gap-4">
          <PinInputRoot
            id="pin-input"
            v-model="value"
            class="flex justify-center gap-2 lg:gap-4"
            @complete="handleComplete"
          >
            <PinInputInput
              v-for="(id, index) in 6"
              :key="id"
              :index="index"
              class="form-input h-10 w-10 text-center font-mono text-lg uppercase max-md:!p-2 md:h-16 md:w-16 md:text-3xl lg:text-4xl"
            />
          </PinInputRoot>
          <button
            @click="handleVerifyOTP"
            :disabled="!canProceed"
            class="btn primary w-fit"
          >
            <span v-if="!loading"> Verify </span>

            <LoaderIcon v-if="loading" class="icon animate-spin" />
          </button>
        </div>
        <!-- <UForm
          :ref="form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup name="url">
            <UInput
              v-model="state.code"
              type="text"
              placeholder="Enter code"
              class="form-input font-mono outline-none"
              input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
              icon="i-solar:password-bold-duotone"
            />
          </UFormGroup>

          <button :disabled="loading" class="btn primary w-full" type="submit">
            <span v-if="!loading"> Verify </span>
            <LoaderIcon v-if="loading" class="icon animate-spin" />
          </button>
        </UForm> -->
      </div>
    </section>
  </main>
</template>
