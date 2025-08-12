<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
    <AppHeader />
    
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Panneau d'Administration
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Bienvenue {{ user?.firstName }} {{ user?.lastName }} - Gestion du système
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Statistiques -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Utilisateurs</h3>
              <p class="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{{ stats.totalUsers }}</p>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Admins</h3>
              <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{{ stats.totalAdmins }}</p>
            </div>
            <div class="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activité</h3>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{{ stats.activeToday }}</p>
            </div>
            <div class="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions d'administration -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Gestion des utilisateurs -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gestion des Utilisateurs</h2>
          
          <div class="space-y-4">
            <button 
              @click="viewUsers"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
            >
              Voir tous les utilisateurs
            </button>
            
            <button 
              @click="createUser"
              class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
            >
              Créer un nouvel utilisateur
            </button>
            
            <button 
              @click="manageRoles"
              class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold"
            >
              Gérer les rôles
            </button>
          </div>
        </div>

        <!-- Configuration système -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuration Système</h2>
          
          <div class="space-y-4">
            <button 
              @click="systemSettings"
              class="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-3 px-4 rounded-lg hover:from-gray-700 hover:to-slate-700 transition-all duration-300 font-semibold"
            >
              Paramètres système
            </button>
            
            <button 
              @click="databaseBackup"
              class="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 font-semibold"
            >
              Sauvegarde de la base de données
            </button>
            
            <button 
              @click="viewLogs"
              class="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-300 font-semibold"
            >
              Consulter les logs
            </button>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
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

// Statistiques simulées (à remplacer par de vraies données)
const stats = reactive({
  totalUsers: 156,
  totalAdmins: 3,
  activeToday: 42
})

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