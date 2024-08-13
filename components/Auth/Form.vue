<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { toast } from "vue-sonner";
import registerUser from "~/utils/auth/register";
import loginUser from "~/utils/auth/login";
import type { User } from "~/types/user";
import useUserStore from "~/store/useUserStore";
import LoaderIcon from "~/assets/icons/loader.svg";

const { type } = defineProps<{
  type: "login" | "register";
}>();

const router = useRouter();

const schema = z.object(
  type === "login"
    ? {
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Must be at least 8 characters"),
      }
    : {
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Must be at least 8 characters"),
        username: z.string().min(3, "Must be at least 3 characters"),
      },
);

type Schema = z.output<typeof schema>;

const state = reactive(
  type == "login"
    ? {
        email: undefined,
        password: undefined,
      }
    : {
        email: undefined,
        password: undefined,
        username: undefined,
      },
);

const userStore = useUserStore();
const accessToken = useCookie("access_token");
const refreshToken = useCookie("refresh_token");

const loading = ref<boolean>(false);
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const registeredUser = ref<User | null>(null);
const showVarifyEmailDrawer = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);

  if (type == "register") {
    toast.promise(
      registerUser({
        email: event.data.email,
        password: event.data.password,
        name: event.data.username,
      }),
      {
        loading: () => {
          loading.value = true;
          return "Registering...";
        },
        success: (data) => {
          console.log(data);
          if (data?.data?.register?.user)
            registeredUser.value = data.data?.register?.user;
          else throw new Error("Something went wrong");
          return "Registered successfully!";
        },
        error: (error) => {
          console.log(error);
          return `${error}`;
        },
        finally: () => {
          loading.value = false;
        },
      },
    );
  }
  if (type == "login") {
    toast.promise(
      loginUser({
        email: event.data.email,
        password: event.data.password,
      }),
      {
        loading: () => {
          loading.value = true;
          return "Logging in...";
        },
        success: (data) => {
          console.log(data);

          if (data?.data?.login?.user) {
            userStore.setUser(data.data?.login?.user);
            accessToken.value = data.data?.login?.accessToken;
            refreshToken.value = data.data?.login?.refreshToken;
          } else throw new Error("Something went wrong");

          setTimeout(() => {
            router.push("/");
          }, 1000);

          return "Logged in successfully!";
        },
        error: (error) => {
          console.log(error);
          return `${error}`;
        },
        finally: () => {
          loading.value = false;
        },
      },
    );
  }
}

watch(
  () => registeredUser.value?.id,
  (value) => {
    console.log({ value });
    value
      ? (showVarifyEmailDrawer.value = true)
      : (showVarifyEmailDrawer.value = false);
  },
);
</script>
<template>
  <div class="form-cont">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup name="email">
        <UInput
          type="email"
          id="email"
          v-model="state.email"
          required
          placeholder="Enter your email"
          class="form-input outline-none"
          input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
          icon="i-solar:letter-bold-duotone"
        />
      </UFormGroup>

      <UFormGroup v-if="type === 'register'" name="username">
        <UInput
          type="text"
          id="username"
          v-model="state.username"
          required
          placeholder="Enter your username"
          class="form-input outline-none"
          input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
          icon="i-solar:user-rounded-bold-duotone"
        />
      </UFormGroup>

      <UFormGroup name="password">
        <UInput
          :type="!passwordVisible ? `password` : `text`"
          id="password"
          v-model="state.password"
          required
          placeholder="Enter your password"
          class="form-input outline-none"
          input-class="rounded-none border-none bg-transparent !ring-0 shadow-none"
          icon="i-solar:password-minimalistic-input-bold-duotone"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <button
              type="button"
              @click="passwordVisible = !passwordVisible"
              class="btn ghost"
            >
              <UIcon
                :name="
                  !passwordVisible
                    ? `i-solar:eye-closed-line-duotone`
                    : `i-solar:eye-line-duotone`
                "
                class="icon"
              />
            </button>
          </template>
        </UInput>
      </UFormGroup>

      <div class="form-control">
        <button class="btn primary w-full" type="submit" :disabled="loading">
          <span v-if="!loading">
            {{ type == "login" ? "Log In" : "Sign Up" }}
          </span>
          <LoaderIcon v-if="loading" class="icon animate-spin" />
        </button>
      </div>

      <div>
        <p v-if="type == 'login'">
          Don't have an account? <NuxtLink to="/register">Register</NuxtLink>
        </p>
        <p v-else>
          Already have an account? <NuxtLink to="/login">Login</NuxtLink>
        </p>
      </div>
    </UForm>

    <AuthVerifyEmailDrawer
      v-if="registeredUser?.email"
      :open="showVarifyEmailDrawer"
      :email="registeredUser?.email"
    />
  </div>
</template>
