<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { logout } = useAuth0();

logout();
</script>

<template>
  <h2>Logging out...</h2>
</template>

<style scoped>

</style>
