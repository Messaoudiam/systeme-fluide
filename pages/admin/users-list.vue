<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
    
    <div class="max-w-7xl mx-auto px-6 py-8 relative z-10">
      <!-- En-tête -->
      <div class="mb-8 flex items-center justify-between animate-fade-in">
        <div>
          <h1 class="text-4xl font-light text-gradient mb-4">
            Gestion des Utilisateurs
          </h1>
          <p class="text-gray-medium dark:text-gray-light">
            {{ users.length }} utilisateurs au total
          </p>
        </div>
        
        <button 
          @click="navigateTo('/admin')"
          class="btn btn-outline group"
        >
          <span class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Retour au panneau</span>
          </span>
        </button>
      </div>

      <!-- États de chargement et d'erreur -->
      <div v-if="isLoading" class="flex justify-center items-center py-12 animate-fade-in">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>

      <div v-else-if="error" class="card p-6 text-center animate-fade-in">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Erreur de chargement</h3>
          <p class="text-gray-medium">{{ error }}</p>
        </div>
        <button @click="loadUsers" class="btn btn-primary">
          Réessayer
        </button>
      </div>

      <!-- Liste des utilisateurs -->
      <div v-else class="space-y-6 animate-fade-in delay-300">
        <!-- Filtres et recherche -->
        <div class="card p-6">
          <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div class="flex-1">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Rechercher par nom, email..."
                class="input w-full"
              >
            </div>
            <div class="flex gap-2">
              <select v-model="roleFilter" class="input">
                <option value="">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="user">Utilisateurs</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tableau des utilisateurs -->
        <div class="card p-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
                <tr>
                  <th class="text-left p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                    Utilisateur
                  </th>
                  <th class="text-left p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                    Email
                  </th>
                  <th class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                    Rôle
                  </th>
                  <th class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                    Date d'inscription
                  </th>
                  <th class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-light/20 dark:divide-gray-medium/20">
                <tr 
                  v-for="user in filteredUsers" 
                  :key="user.id"
                  class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <td class="p-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-gray-light rounded-full flex items-center justify-center">
                        <span class="text-white dark:text-black font-semibold text-sm">
                          {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                        </span>
                      </div>
                      <div>
                        <p class="font-medium text-black dark:text-white">
                          {{ user.firstName }} {{ user.lastName }}
                        </p>
                        <p v-if="user.gender" class="text-sm text-gray-medium dark:text-gray-light">
                          {{ user.gender === 'M' ? 'Homme' : 'Femme' }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <p class="text-black dark:text-white">{{ user.email }}</p>
                  </td>
                  <td class="p-4 text-center">
                    <span 
                      :class="user.role === 'admin' 
                        ? 'bg-gradient-to-r from-success to-warning text-white px-3 py-1 rounded-full text-sm font-medium' 
                        : 'bg-gray-light/20 dark:bg-gray-medium/20 text-gray-dark dark:text-gray-light px-3 py-1 rounded-full text-sm font-medium'"
                    >
                      {{ user.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                    </span>
                  </td>
                  <td class="p-4 text-center">
                    <p class="text-black dark:text-white">
                      {{ formatDate(user.createdAt) }}
                    </p>
                  </td>
                  <td class="p-4 text-center">
                    <button 
                      @click="viewUserDetails(user)"
                      class="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
                      title="Voir les détails"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div v-if="filteredUsers.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-medium dark:text-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            <p class="text-gray-medium dark:text-gray-light text-lg">
              Aucun utilisateur trouvé
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de détails utilisateur -->
    <div 
      v-if="selectedUser"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      @click="selectedUser = null"
    >
      <div 
        class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-light text-gradient">
              {{ selectedUser.firstName }} {{ selectedUser.lastName }}
            </h3>
            <button 
              @click="selectedUser = null"
              class="text-gray-medium dark:text-gray-light hover:text-black dark:hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-black dark:text-white mb-2">Informations personnelles</h4>
                <div class="space-y-2">
                  <p><span class="text-gray-medium dark:text-gray-light">Email:</span> {{ selectedUser.email }}</p>
                  <p><span class="text-gray-medium dark:text-gray-light">Rôle:</span> {{ selectedUser.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}</p>
                  <p v-if="selectedUser.birthDate"><span class="text-gray-medium dark:text-gray-light">Date de naissance:</span> {{ formatDate(selectedUser.birthDate) }}</p>
                  <p v-if="selectedUser.gender"><span class="text-gray-medium dark:text-gray-light">Sexe:</span> {{ selectedUser.gender === 'M' ? 'Homme' : 'Femme' }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-black dark:text-white mb-2">Objectifs fitness</h4>
                <div class="space-y-2">
                  <p v-if="selectedUser.heightCm"><span class="text-gray-medium dark:text-gray-light">Taille:</span> {{ selectedUser.heightCm }} cm</p>
                  <p v-if="selectedUser.targetWeightKg"><span class="text-gray-medium dark:text-gray-light">Poids cible:</span> {{ selectedUser.targetWeightKg }} kg</p>
                  <p v-if="selectedUser.targetStepsPerDay"><span class="text-gray-medium dark:text-gray-light">Pas quotidiens:</span> {{ selectedUser.targetStepsPerDay.toLocaleString() }}</p>
                  <p v-if="selectedUser.targetCaloriesPerDay"><span class="text-gray-medium dark:text-gray-light">Calories cibles:</span> {{ selectedUser.targetCaloriesPerDay }} kcal</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-light/20 dark:border-gray-medium/20">
            <div class="flex justify-between text-sm text-gray-medium dark:text-gray-light">
              <p>Inscription: {{ formatDate(selectedUser.createdAt) }}</p>
              <p>Dernière mise à jour: {{ formatDate(selectedUser.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// Protection de la route avec middleware admin
definePageMeta({
  middleware: 'admin',
  layout: false
})

useHead({
  title: 'Gestion des Utilisateurs - Administration',
  meta: [
    { name: 'description', content: 'Liste et gestion des utilisateurs du système Fluide' }
  ]
})

const { getAllUsers } = useDatabase()

// États réactifs
const users = ref<any[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const selectedUser = ref<any | null>(null)
const searchTerm = ref('')
const roleFilter = ref('')

// Utilisateurs filtrés
const filteredUsers = computed(() => {
  let filtered = users.value

  // Filtre par recherche
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )
  }

  // Filtre par rôle
  if (roleFilter.value) {
    filtered = filtered.filter(user => user.role === roleFilter.value)
  }

  return filtered
})

// Charger les utilisateurs au montage
onMounted(async () => {
  await loadUsers()
})

// Fonction pour charger les utilisateurs
const loadUsers = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const result = await getAllUsers()
    if (result.success && result.data) {
      users.value = result.data
    } else {
      error.value = result.error || 'Erreur lors du chargement des utilisateurs'
    }
  } catch (err) {
    console.error('Erreur lors du chargement des utilisateurs:', err)
    error.value = 'Erreur lors du chargement des utilisateurs'
  } finally {
    isLoading.value = false
  }
}

// Fonction pour voir les détails d'un utilisateur
const viewUserDetails = (user: any) => {
  selectedUser.value = user
}

// Fonction pour formater les dates
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>