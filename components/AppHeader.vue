<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-dark/60 border-b border-gray-light/30 dark:border-gray-medium/20"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Brand -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white rounded-xl"
        >
          <span
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
          </span>
          <span class="text-lg md:text-xl font-light text-gradient"
            >Système Fluide</span
          >
        </NuxtLink>

        <!-- Desktop nav -->
        <nav
          aria-label="Principale"
          class="hidden md:flex items-center space-x-1"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-xl text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            :aria-current="route.path === link.to ? 'page' : undefined"
            :class="{
              'bg-black/10 dark:bg-white/10 text-black dark:text-white':
                route.path === link.to,
            }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center space-x-2">
          <!-- User menu (if authenticated) -->
          <div v-if="isLoggedIn" class="hidden md:flex items-center space-x-2">
            <span class="text-sm text-black/70 dark:text-white/70">
              Bonjour, {{ user?.firstName }}
            </span>
            
            <!-- Admin link -->
            <NuxtLink
              v-if="isAdmin"
              to="/admin"
              class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
            >
              Admin
            </NuxtLink>
            
            <button
              class="px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
              @click="handleLogout"
            >
              Déconnexion
            </button>
          </div>
          
          <!-- Login button (if not authenticated) -->
          <NuxtLink
            v-else
            to="/login"
            class="hidden md:inline-flex px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Connexion
          </NuxtLink>
          
          <!-- Theme toggle -->
          <button
            type="button"
            class="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            :aria-label="
              colorMode.value === 'dark'
                ? 'Activer le mode clair'
                : 'Activer le mode sombre'
            "
            @click="toggleColorMode"
          >
            <ClientOnly>
              <svg
                v-if="colorMode.value === 'dark'"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 13.435l-.707.707M12 20v1m7-4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
              <template #fallback>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              </template>
            </ClientOnly>
          </button>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
            aria-controls="primary-navigation"
            aria-label="Ouvrir le menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              v-if="!isMenuOpen"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile nav panel -->
    <div
      v-show="isMenuOpen"
      class="md:hidden border-t border-gray-light/30 dark:border-gray-medium/20"
      @keydown.esc="isMenuOpen = false"
    >
      <nav
        id="primary-navigation"
        aria-label="Principale mobile"
        class="px-6 py-4"
      >
        <div class="flex flex-col space-y-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to + '-mobile'"
            :to="link.to"
            class="px-4 py-3 rounded-xl text-base font-medium text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            :aria-current="route.path === link.to ? 'page' : undefined"
            :class="{
              'bg-black/10 dark:bg-white/10 text-black dark:text-white':
                route.path === link.to,
            }"
          >
            {{ link.label }}
          </NuxtLink>
          <!-- Mobile auth buttons -->
          <div v-if="isLoggedIn" class="pt-2 border-t border-gray-light/30 dark:border-gray-medium/20">
            <div class="flex flex-col space-y-2">
              <div class="px-4 py-2 text-sm text-black/70 dark:text-white/70">
                Bonjour, {{ user?.firstName }} {{ user?.lastName }}
              </div>
              
              <NuxtLink
                v-if="isAdmin"
                to="/admin"
                class="px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors text-center"
              >
                Panneau Admin
              </NuxtLink>
              
              <button
                class="px-4 py-2 text-sm font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                @click="handleLogout"
              >
                Déconnexion
              </button>
            </div>
          </div>
          
          <NuxtLink
            v-else
            to="/login"
            class="btn btn-primary px-5 py-3 text-center"
          >
            Connexion
          </NuxtLink>
          
          <NuxtLink
            to="/dashboard"
            class="btn btn-primary px-5 py-3 text-center"
          >
            Commencer
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isMenuOpen = ref(false);

// Authentication state
const { user, isLoggedIn, isAdmin, logout } = useAuth();

// Close menu on route change
const stopWatch = watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);
onBeforeUnmount(() => stopWatch());

// Color mode toggle
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Handle logout
const handleLogout = async () => {
  await logout();
  isMenuOpen.value = false;
};

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/pyramides-helms", label: "Pyramides de Helms" },
  { to: "/calculateur-tdee", label: "Calculateur TDEE" },
  { to: "/team", label: "Équipe" },
  { to: "/dashboard", label: "Dashboard" },
];
</script>



