<template>
  <div class="bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
    
    <div class="max-w-7xl mx-auto px-6 py-8 relative z-10">
      <div class="mb-8 text-center animate-fade-in">
        <h1 class="text-4xl font-light text-gradient mb-4">
          Panneau d'Administration
        </h1>
        <p class="text-gray-medium dark:text-gray-light">
          Bienvenue {{ user?.firstName }} {{ user?.lastName }} - Gestion du système
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in delay-300">
        <!-- Statistiques -->
        <div class="card-metric p-6 group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider">Utilisateurs</h3>
              <div class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="text-4xl font-light text-black dark:text-white mb-2">
              <span v-if="isLoading" class="animate-pulse">--</span>
              <span v-else>{{ stats.totalUsers }}</span>
            </div>
            <p class="text-sm text-gray-medium dark:text-gray-light font-medium">utilisateurs inscrits</p>
          </div>
        </div>

        <div class="card-metric p-6 group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider">Admins</h3>
              <div class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <div class="text-4xl font-light text-black dark:text-white mb-2">
              <span v-if="isLoading" class="animate-pulse">--</span>
              <span v-else>{{ stats.totalAdmins }}</span>
            </div>
            <p class="text-sm text-gray-medium dark:text-gray-light font-medium">administrateurs</p>
          </div>
        </div>

        <div class="card-metric p-6 group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider">Activité</h3>
              <div class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="text-4xl font-light text-black dark:text-white mb-2">
              <span v-if="isLoading" class="animate-pulse">--</span>
              <span v-else>{{ stats.activeToday }}</span>
            </div>
            <p class="text-sm text-gray-medium dark:text-gray-light font-medium">actifs aujourd'hui</p>
          </div>
        </div>
      </div>

      <!-- Actions d'administration -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in delay-500">
        <!-- Gestion des utilisateurs -->
        <div class="card p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-medium to-black dark:from-white dark:via-gray-light dark:to-white"></div>
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-light text-gradient mb-2">Gestion des Utilisateurs</h2>
              <p class="text-gray-medium dark:text-gray-light">Administrer les comptes utilisateurs</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-4">
            <button 
              @click="viewUsers"
              class="btn btn-primary w-full py-4 text-lg relative overflow-hidden group"
            >
              <span class="relative z-10 flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span>Voir tous les utilisateurs</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <button 
              @click="createUser"
              class="btn btn-outline w-full py-4 text-lg group"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Créer un nouvel utilisateur</span>
              </span>
            </button>
            
            <button 
              @click="manageRoles"
              class="btn btn-outline w-full py-4 text-lg group"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span>Gérer les rôles</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Configuration système -->
        <div class="card p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-medium to-black dark:from-white dark:via-gray-light dark:to-white"></div>
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-light text-gradient mb-2">Configuration Système</h2>
              <p class="text-gray-medium dark:text-gray-light">Paramètres et maintenance</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-4">
            <button 
              @click="systemSettings"
              class="btn btn-outline w-full py-4 text-lg group"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
                <span>Paramètres système</span>
              </span>
            </button>
            
            <button 
              @click="databaseBackup"
              class="btn btn-outline w-full py-4 text-lg group"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                <span>Sauvegarde de la base de données</span>
              </span>
            </button>
            
            <button 
              @click="viewLogs"
              class="btn btn-outline w-full py-4 text-lg group"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Consulter les logs</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Protection de la route avec middleware admin
definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Administration - Système Fluide',
  meta: [
    { name: 'description', content: 'Panneau d\'administration pour la gestion du système Fluide' }
  ]
})

const { user } = useAuth()
const { getAdminStats } = useDatabase()

// Statistiques réactives
const stats = reactive({
  totalUsers: 0,
  totalAdmins: 0,
  activeToday: 0
})

// État de chargement
const isLoading = ref(true)

// Charger les statistiques au montage du composant
onMounted(async () => {
  await loadAdminStats()
})

// Fonction pour charger les statistiques d'administration
const loadAdminStats = async () => {
  isLoading.value = true
  
  try {
    const result = await getAdminStats()
    if (result.success && result.data) {
      Object.assign(stats, result.data)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des stats admin:', error)
  } finally {
    isLoading.value = false
  }
}

// Actions d'administration (simulées)
const viewUsers = () => {
  alert('Fonctionnalité "Voir tous les utilisateurs" - À implémenter')
}

const createUser = () => {
  alert('Fonctionnalité "Créer un utilisateur" - À implémenter')
}

const manageRoles = () => {
  alert('Fonctionnalité "Gérer les rôles" - À implémenter')
}

const systemSettings = () => {
  alert('Fonctionnalité "Paramètres système" - À implémenter')
}

const databaseBackup = () => {
  alert('Fonctionnalité "Sauvegarde DB" - À implémenter')
}

const viewLogs = () => {
  alert('Fonctionnalité "Consulter les logs" - À implémenter')
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

.delay-500 {
  animation-delay: 0.5s;
}
</style>