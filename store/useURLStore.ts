import { defineStore } from "pinia";
import type { URL } from "~/types/url";

const useURLStore = defineStore("urls", () => {
  const urls = ref<URL[]>([]);

  const addURL = (url: URL) => {
    // check if the url already exists
    if (urls.value.find((u) => u.id === url.id)) return;
    urls.value = [url, ...urls.value];
    // console.log({ urls: urls.value });
  };

  const addURLs = (urlList: URL[]) => {
    // ensure no duplicates
    const newUrls = urlList.filter(
      (url) => !urls.value.find((u) => u.id === url.id),
    );
    urls.value = [...newUrls, ...urls.value];
  };

  const removeURL = (id: string) => {
    const index = urls.value.findIndex((u) => u.id === id);
    if (index === -1) return;
    urls.value.filter((u, i) => i !== index);
  };

  const setURLs = (newURLs: URL[]) => {
    urls.value = newURLs;
    // save to localStorage
    localStorage.setItem("urls", JSON.stringify(newURLs));
  };

  watch(
    () => urls.value,
    (value) => {
      // save to local storage
      value.length > 0 && localStorage.setItem("urls", JSON.stringify(value));
    },
  );

  return {
    urls,
    addURL,
    addURLs,
    removeURL,
    setURLs,
  };
});

export default useURLStore;
