<template>
  <footer
    class="border-t border-gray-light/30 dark:border-gray-medium/20 bg-white/60 dark:bg-gray-dark/60 backdrop-blur-xl"
  >
    <div class="max-w-7xl mx-auto px-6 py-6 md:py-12">
      <!-- Mobile Layout -->
      <div class="block md:hidden">
        <!-- Brand -->
        <div class="mb-6">
          <div class="flex items-center space-x-3 mb-3">
            <div
              class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white"
            >
              <span class="sr-only">Système Fluide</span>
              <svg
                class="w-5 h-5 text-white dark:text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-lg font-light text-black dark:text-white"
              >Système Fluide</span
            >
          </div>
          <p
            class="text-sm text-gray-medium dark:text-gray-light leading-relaxed"
          >
            Rendre l'excellence physique accessible à tous grâce à un système de
            progression infini basé sur la science.
          </p>
        </div>

        <!-- Navigation et Ressources - Mobile -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Navigation -->
          <nav aria-label="Liens rapides" class="space-y-2">
            <h3
              class="text-sm font-semibold text-black dark:text-white tracking-wide"
            >
              Navigation
            </h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white rounded"
                  :aria-current="route.path === link.to ? 'page' : undefined"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Ressources -->
          <div class="space-y-2">
            <h3
              class="text-sm font-semibold text-black dark:text-white tracking-wide"
            >
              Ressources
            </h3>
            <ul class="space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>
                <NuxtLink to="/about" class="hover:underline underline-offset-4"
                  >La méthode</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/dashboard"
                  class="hover:underline underline-offset-4"
                  >Le dashboard</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter - Mobile -->
        <form
          class="space-y-3"
          aria-labelledby="newsletter-title-mobile"
          @submit.prevent
        >
          <h3
            id="newsletter-title-mobile"
            class="text-sm font-semibold text-black dark:text-white tracking-wide"
          >
            Restez informé
          </h3>
          <p class="text-sm text-gray-medium dark:text-gray-light">
            Recevez les nouveautés du Système.
          </p>
          <label for="newsletter-email-mobile" class="sr-only"
            >Adresse e-mail</label
          >
          <div class="flex flex-col space-y-2">
            <input
              id="newsletter-email-mobile"
              type="email"
              autocomplete="email"
              inputmode="email"
              placeholder="votre@email"
              class="input-modern !py-2.5"
              aria-required="true"
            >
            <button type="submit" class="btn btn-primary px-4 py-2 w-full">
              S'inscrire
            </button>
          </div>
          <p class="text-xs text-gray-medium dark:text-gray-light">
            En vous inscrivant, vous acceptez notre politique de
            confidentialité.
          </p>
        </form>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden md:grid md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white"
            >
              <span class="sr-only">Système Fluide</span>
              <svg
                class="w-5 h-5 text-white dark:text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-lg font-light text-black dark:text-white"
              >Système Fluide</span
            >
          </div>
          <p
            class="text-sm text-gray-medium dark:text-gray-light leading-relaxed"
          >
            Rendre l'excellence physique accessible à tous grâce à un système de
            progression infini basé sur la science.
          </p>
        </div>

        <!-- Navigation et Ressources - Desktop -->
        <div class="grid grid-cols-2 gap-8">
          <!-- Navigation -->
          <nav aria-label="Liens rapides" class="space-y-3">
            <h3
              class="text-sm font-semibold text-black dark:text-white tracking-wide"
            >
              Navigation
            </h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white rounded"
                  :aria-current="route.path === link.to ? 'page' : undefined"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Ressources -->
          <div class="space-y-3">
            <h3
              class="text-sm font-semibold text-black dark:text-white tracking-wide"
            >
              Ressources
            </h3>
            <ul class="space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>
                <NuxtLink to="/about" class="hover:underline underline-offset-4"
                  >La méthode</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/dashboard"
                  class="hover:underline underline-offset-4"
                  >Le dashboard</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter - Desktop -->
        <form
          class="space-y-3"
          aria-labelledby="newsletter-title-desktop"
          @submit.prevent
        >
          <h3
            id="newsletter-title-desktop"
            class="text-sm font-semibold text-black dark:text-white tracking-wide"
          >
            Restez informé
          </h3>
          <p class="text-sm text-gray-medium dark:text-gray-light">
            Recevez les nouveautés du Système.
          </p>
          <label for="newsletter-email-desktop" class="sr-only"
            >Adresse e-mail</label
          >
          <div class="flex items-center space-x-2">
            <input
              id="newsletter-email-desktop"
              type="email"
              autocomplete="email"
              inputmode="email"
              placeholder="votre@email"
              class="input-modern !py-2.5"
              aria-required="true"
            >
            <button type="submit" class="btn btn-primary px-4 py-2">
              S'inscrire
            </button>
          </div>
          <p class="text-xs text-gray-medium dark:text-gray-light">
            En vous inscrivant, vous acceptez notre politique de
            confidentialité.
          </p>
        </form>
      </div>

      <div
        class="mt-8 pt-6 md:mt-12 md:pt-8 border-t border-gray-light/30 dark:border-gray-medium/20 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p class="text-xs text-gray-medium dark:text-gray-light">
          © {{ new Date().getFullYear() }} Système Fluide. Tous droits réservés.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-xs text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
            >Mentions légales</NuxtLink
          >
          <span class="text-gray-light dark:text-gray-medium">•</span>
          <NuxtLink
            to="/"
            class="text-xs text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
            >Confidentialité</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute();
const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/team", label: "Équipe" },
  { to: "/dashboard", label: "Dashboard" },
];
</script>
