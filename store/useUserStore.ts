import { defineStore } from "pinia";
import type { User } from "~/types/user";

const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  // watch(
  //   () => user.value,
  //   (newUser) => {
  //     localStorage.setItem("user", JSON.stringify(newUser));
  //   },
  //   { deep: true },
  // );

  // onMounted(() => {
  //   const userString = localStorage.getItem("user");
  //   if (userString) {
  //     const userObject = JSON.parse(userString);
  //     setUser(userObject);
  //   }
  // });

  return {
    user,
    setUser,
  };
});

export default useUserStore;
