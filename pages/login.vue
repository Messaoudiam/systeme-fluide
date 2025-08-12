<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest flex items-center justify-center px-4 transition-all duration-500 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
    
    <div class="max-w-md w-full relative z-10">
      <div class="card p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-light text-black dark:text-white">Connexion</h1>
          <p class="text-gray-medium dark:text-gray-light mt-2">Connectez-vous à votre compte</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="input-modern"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3">
              Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-modern pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium dark:text-gray-light hover:text-black dark:hover:text-white transition-colors duration-200"
                tabindex="-1"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn btn-primary w-full py-4 text-lg relative overflow-hidden group disabled:opacity-50"
          >
            <span class="relative z-10 flex items-center justify-center space-x-2">
              <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              <span v-if="!isLoading">Se connecter</span>
              <span v-else>Connexion...</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          <div v-if="error" class="glass-strong p-4 rounded-lg border border-error/20">
            <p class="text-error text-sm font-medium">{{ error }}</p>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Connexion - Système Fluide',
  meta: [
    { name: 'description', content: 'Connectez-vous à votre compte Système Fluide' }
  ]
})

const { login } = useAuth()
const router = useRouter()

const formData = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await login(formData)
    
    if (result.success) {
      // Rediriger vers la page demandée ou dashboard par défaut
      const route = useRoute()
      const redirectTo = (route.query.redirect as string) || '/dashboard'
      await router.push(redirectTo)
    } else {
      error.value = result.error || 'Erreur de connexion'
    }
  } catch (err) {
    error.value = 'Une erreur inattendue s\'est produite'
    console.error('Erreur de connexion:', err)
  } finally {
    isLoading.value = false
  }
}
</script>