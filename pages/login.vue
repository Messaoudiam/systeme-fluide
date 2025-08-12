<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Connexion</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Connectez-vous à votre compte</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold disabled:opacity-50"
          >
            <span v-if="!isLoading">Se connecter</span>
            <span v-else>Connexion...</span>
          </button>

          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p class="text-red-700 dark:text-red-400 text-sm">{{ error }}</p>
          </div>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Comptes de test :</p>
            <div class="space-y-1 text-xs text-blue-700 dark:text-blue-300">
              <p><strong>Admin:</strong> admin@test.fr / admin123</p>
              <p><strong>User:</strong> user@test.fr / user123</p>
            </div>
          </div>
        </div>
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