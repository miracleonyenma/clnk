<script setup lang="ts">
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  DrawerTitle,
} from "vaul-vue";

const props = defineProps<{
  open: boolean;
  email: string;
}>();

const open = ref(props.open);
</script>

<template>
  <DrawerRoot v-model:open="open">
    <!-- <DrawerTrigger> <slot> Open </slot> </DrawerTrigger> -->
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
          Verify your email
        </DrawerTitle>
        <div class="flex-1 rounded-t-[10px] p-6">
          <div
            class="mx-auto flex max-w-md flex-col items-center gap-2 text-center"
          >
            <UIcon name="i-solar:letter-bold-duotone" class="h-32 w-32" />

            <p>
              We have sent a verification code to your email address:
              <strong>{{ email }}</strong
              >. Please copy the code and click the button below to proceed.
            </p>

            <NuxtLink :to="`/verify-code?email=${email}`" class="btn mt-4"
              >Proceed</NuxtLink
            >
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
