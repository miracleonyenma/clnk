import * as htmlToImage from "html-to-image";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      htmlToImage,
    },
  };
});
