<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";

const { isAuthenticated, loginWithRedirect } = useAuth0();
const router = useRouter();

onBeforeRouteUpdate(() => {
  // If the user is already logged in,
  // redirect directly to shop page
  if (isAuthenticated.value) {
    router.push('/shop');
  }
});
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Do amazing things with Customer Identity Cloud</h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      Okta Customer Identity Cloud aka Auth0 is your one-stop shop for all things identity. This sample app uses Auth0's Organization
      feature to allow your customers to select their desired role and dynamically adjusts the listings in the demo shop.
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="#" @click="loginWithRedirect()" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
      <a href="https://auth0.com/docs/manage-users/organizations" target="_blank" class="text-sm font-semibold leading-6 text-gray-900">Learn more
        <span aria-hidden="true">→</span></a>
    </div>
  </div>
</template>
