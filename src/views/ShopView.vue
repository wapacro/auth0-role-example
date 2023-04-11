<script setup lang="ts">
import { ref } from "vue";
import productsDatabase from "@/database/producs";
import organizationsDatabase from "@/database/organizations";
import { useAuth0 } from "@auth0/auth0-vue";

const { idTokenClaims } = useAuth0();

const showRoleInfo  = ref(true);
function dismiss() {
  showRoleInfo.value = false
}

// Evaluate role of currently signed-in user, fallback to 'personal'
const role = organizationsDatabase.find(org => org.id === idTokenClaims.value?.org_id)?.role ?? 'personal'

// Filter products by role
const products = productsDatabase.filter(product => product.requiredRole.includes(role))
</script>

<template>
  <h2 class="text-2xl font-bold tracking-tight text-gray-900">Available items</h2>

  <div id="alert-additional-content-1" class="p-4 my-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50" role="alert" v-if="showRoleInfo">
    <div class="flex items-center">
      <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">Info</span>
      <h3 class="text-lg font-medium">Hold up</h3>
    </div>
    <div class="mt-2 mb-4 text-sm">
      You are viewing this page with your personal account. Consider changing your role to change available product listings.
    </div>
    <div class="flex">
      <RouterLink to="/orgs" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Change Role
      </RouterLink>
      <button type="button" @click="dismiss" class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
        Dismiss
      </button>
    </div>
  </div>

  <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    <div v-for="product in products" :key="product.id" class="group relative">
      <div class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img :src="product.image" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0" />
              {{ product.name }}
            </a>
          </h3>
        </div>
        <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
