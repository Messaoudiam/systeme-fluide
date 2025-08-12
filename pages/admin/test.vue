<template>
  <div class="p-8">
    <h1>Page de test admin</h1>
    <p>Si vous voyez ceci, le middleware admin fonctionne.</p>
    <nuxt-link to="/admin" class="text-blue-500 underline">Retour au panneau admin</nuxt-link>
  </div>
</template>

<script setup>
// Protection de la route avec middleware admin
definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Test Admin - Administration',
})
</script>