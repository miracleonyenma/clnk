<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const loading = ref<boolean>(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}

useSeoMeta({
  title: "Log in",
  description: "Log in to your account",
});
</script>
<template>
  <main>
    <section class="site-section">
      <div class="wrapper">
        <header class="mb-12">
          <div class="wrapper">
            <h1 class="text-2xl font-bold lg:text-6xl">Log in</h1>
          </div>
        </header>

        <AuthForm type="login" />
      </div>
    </section>
  </main>
</template>
