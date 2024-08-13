import { defineStore } from "pinia";
import type { URL } from "~/types/url";

const useURLStore = defineStore("urls", () => {
  const urls = ref<URL[]>([]);

  const addURL = (url: URL) => {
    // check if the url already exists
    if (urls.value.find((u) => u.id === url.id)) return;
    urls.value = [...urls.value, url];
    console.log({ urls: urls.value });
  };

  const addURLs = (urlList: URL[]) => {
    // ensure no duplicates
    const newUrls = urlList.filter(
      (url) => !urls.value.find((u) => u.id === url.id),
    );
    urls.value = [...urls.value, ...newUrls];
  };

  const removeURL = (id: string) => {
    const index = urls.value.findIndex((u) => u.id === id);
    if (index === -1) return;
    urls.value.filter((u, i) => i !== index);
  };

  const setURLs = (newURLs: URL[]) => {
    urls.value = newURLs;
  };

  return {
    urls,
    addURL,
    addURLs,
    removeURL,
    setURLs,
  };
});

export default useURLStore;