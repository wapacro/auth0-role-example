<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import OrganizationsDatabase from "@/database/organizations";
import OrganizationUsersDatabase from "@/database/organizationUsers";
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect, user, idTokenClaims } = useAuth0();

// Get all orgs the signed-in user is a member of
const userOrgs = OrganizationUsersDatabase.filter(role => role.user === user.value.email).map(role => role.organization);

// Create a list of all these orgs and add a entry for "Personal account" at the end
const roles = OrganizationsDatabase.filter(org => userOrgs.includes(org.id));
roles.push({
  id: '',
  name: 'Personal Account',
  image: user.value.picture as string,
  role: 'personal'
});

// Check if "org_id" is present on ID Token and preselect the corresponding
// organization if so. Otherwise, "Personal Account" is selected.
const index = idTokenClaims.value?.org_id ? roles.findIndex(org => org.id === idTokenClaims.value?.org_id) : roles.length - 1;
const selected = ref(roles[index]);

// Re-do the login once the user selects the desired role
function apply() {
  const orgId = selected.value.id !== '' ? selected.value.id : undefined
  return loginWithRedirect({
    authorizationParams: {
      organization: orgId
    }
  })
}
</script>

<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Choose your role</h2>
      </div>
      <form class="mt-8 space-y-6" action="#">
        <Listbox as="div" v-model="selected">
          <div class="relative mt-2">
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
        <span class="flex items-center">
          <img :src="selected.image" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="role in roles" :key="role.id" :value="role" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <img :src="role.image" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ role.name }}</span>
                    </div>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div>
          <button type="submit" @click="apply" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Apply
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
