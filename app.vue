<template>
  <div>
    <a
      href="#contenu-principal"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white dark:focus:bg-gray-dark focus:text-black dark:focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white"
      >Aller au contenu</a
    >
    <AppHeader />
    <main id="contenu-principal">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
