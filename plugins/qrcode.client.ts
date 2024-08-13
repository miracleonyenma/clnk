//  ./plugins/qrcode.client.ts

import QRCodeStyling, { type Options } from "qr-code-styling";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      qrCodeStyling: (options: Options) => {
        // console.log("qrCodeStyling", options);

        const qrCodeStyling = new QRCodeStyling(options);
        return qrCodeStyling;
      },
    },
  };
});
