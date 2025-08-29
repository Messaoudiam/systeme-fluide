<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-dark/60 border-b border-gray-light/30 dark:border-gray-medium/20"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Brand -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 focus:outline-none rounded-xl"
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
            class="px-4 py-2 rounded-xl text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none"
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
          <div v-if="isLoggedIn" class="hidden md:block relative group">
            <button
              class="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-white dark:text-black">
                  {{ user?.firstName?.charAt(0) }}{{ user?.lastName?.charAt(0) }}
                </span>
              </div>
              <span class="text-sm text-black dark:text-white">{{ user?.firstName }}</span>
              <svg class="w-4 h-4 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div class="absolute right-0 top-full mt-2 w-48 bg-white/90 dark:bg-gray-dark/90 backdrop-blur-md border border-gray-light/50 dark:border-gray-medium/50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="p-3 border-b border-gray-light/30 dark:border-gray-medium/30">
                <p class="text-sm font-medium text-black dark:text-white">{{ user?.firstName }} {{ user?.lastName }}</p>
                <p class="text-xs text-gray-medium dark:text-gray-light">{{ user?.email }}</p>
              </div>
              
              <div class="py-2">
                <NuxtLink
                  v-if="isAdmin"
                  to="/admin"
                  class="flex items-center px-3 py-2 text-sm text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Administration
                </NuxtLink>
                
                <button
                  class="flex items-center w-full px-3 py-2 text-sm text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  @click="handleLogout"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
          
          <!-- Login button (if not authenticated) -->
          <NuxtLink
            v-else
            to="/login"
            class="hidden md:inline-flex btn btn-primary px-4 py-2 text-sm"
          >
            Connexion
          </NuxtLink>
          
          <!-- Theme toggle -->
          <button
            type="button"
            class="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white focus:outline-none"
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
                <circle cx="12" cy="12" r="5" stroke-width="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke-width="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke-width="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-width="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-width="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke-width="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke-width="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-width="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-width="2"/>
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
            class="px-4 py-3 rounded-xl text-base font-medium text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none"
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
                class="px-4 py-2 text-sm font-medium bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-colors text-center"
              >
                Panneau Admin
              </NuxtLink>
              
              <button
                class="px-4 py-2 text-sm font-medium bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
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



