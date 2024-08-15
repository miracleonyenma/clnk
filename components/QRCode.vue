<script setup lang="ts">
import type { Options } from "qr-code-styling";
import type QRCodeStyling from "qr-code-styling";
const props = defineProps<{
  id: string;
  data: string;
  options?: Partial<QRCodeStyling>;
}>();
const emit = defineEmits(["update-download"]);

const { $qrCodeStyling } = useNuxtApp();
const qrCode = ref<HTMLElement | null>(null);
const options: Options = {
  width: 300,
  height: 300,
  type: "canvas",
  data: props.data,
  image: "/img/clnk-icon@2x.png",
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.28,
    margin: 8,
  },
  ...props.options,
};

onMounted(() => {
  const qrCodeStyling = $qrCodeStyling(options);

  const elementById = document.getElementById(props.id!);
  if (elementById) {
    qrCode.value = elementById;
  }

  // console.log({ qrCode: qrCode.value, qrCodeStyling, elementById });

  if (qrCode.value) {
    emit("update-download", qrCodeStyling.download);
    qrCodeStyling.append(qrCode.value);
    qrCode.value!.firstElementChild!.setAttribute(
      "viewBox",
      `0 0 ${options.width} ${options.height}`,
    );
  }
});

watch(
  () => props.data,
  (data) => {
    const qrCodeStyling = $qrCodeStyling(options);

    // console.log({ qrCode: qrCode.value });

    qrCodeStyling.update({ data });
    qrCode.value!.firstElementChild!.setAttribute(
      "viewBox",
      `0 0 ${options.width} ${options.height}`,
    );
  },
);
</script>
<template>
  <div :id="props.id" class="qr-code"></div>
</template>
<style scoped>
:deep(canvas) {
  @apply h-full w-full;
}
</style>
