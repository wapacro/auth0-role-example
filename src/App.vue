<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect, user, isAuthenticated } = useAuth0();

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Logout', href: '/logout' }
];
</script>

<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 px-8" aria-label="Global">
        <div class="flex flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <img class="h-8 w-auto" src="/favicon.png" alt="" />
          </a>
        </div>
        <div class="flex gap-x-12" v-if="isAuthenticated">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</RouterLink>
        </div>
        <div class="flex flex-1 justify-end">
          <a v-if="!isAuthenticated" href="#" @click="loginWithRedirect()" class="text-sm font-semibold leading-6 text-gray-900">Log in
            <span aria-hidden="true">&rarr;</span></a>
          <span v-else class="text-sm font-semibold leading-6 text-gray-900">Hi, {{ user.name }}</span>
        </div>
      </nav>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
        <RouterView />
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>
