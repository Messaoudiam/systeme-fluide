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

    <!-- Modal Liste des Utilisateurs -->
    <div 
      v-if="showUsersModal"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      @click="showUsersModal = false"
    >
      <div 
        class="card max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- En-tête du modal -->
        <div class="flex justify-between items-center p-6 border-b border-gray-light/20 dark:border-gray-medium/20">
          <h3 class="text-2xl font-light text-gradient">
            Gestion des Utilisateurs
          </h3>
          <button 
            @click="showUsersModal = false"
            class="text-gray-medium dark:text-gray-light hover:text-black dark:hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Contenu du modal avec scroll -->
        <div class="flex-1 overflow-y-auto">
          <!-- État de chargement -->
          <div v-if="isLoadingUsers" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>

          <!-- Erreur -->
          <div v-else-if="usersError" class="text-center py-12 px-6">
            <div class="text-red-500 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 class="text-xl font-semibold mb-2">Erreur de chargement</h4>
              <p class="text-gray-medium">{{ usersError }}</p>
            </div>
            <button @click="loadUsers" class="btn btn-primary">
              Réessayer
            </button>
          </div>

          <!-- Liste des utilisateurs -->
          <div v-else class="px-6 pb-6">
            <!-- Barre de recherche et filtres -->
            <div class="mb-6 space-y-6">
              <!-- Barre de recherche principale -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-medium dark:text-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  class="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-darkest border border-gray-light/30 dark:border-gray-medium/30 rounded-xl text-black dark:text-white placeholder-gray-medium dark:placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300"
                >
                <button
                  v-if="searchTerm"
                  @click="searchTerm = ''"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-medium hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- Filtres et contrôles -->
              <div class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div class="flex flex-col sm:flex-row gap-3">
                  <!-- Filtre par rôle -->
                  <div class="relative">
                    <select 
                      v-model="roleFilter" 
                      class="appearance-none bg-white dark:bg-gray-darkest border border-gray-light/30 dark:border-gray-medium/30 rounded-lg px-4 py-2.5 pr-10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 cursor-pointer min-w-[140px]"
                    >
                      <option value="">Tous les rôles</option>
                      <option value="admin">Administrateurs</option>
                      <option value="user">Utilisateurs</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-medium dark:text-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- Tri -->
                  <div class="relative">
                    <select 
                      v-model="sortBy" 
                      class="appearance-none bg-white dark:bg-gray-darkest border border-gray-light/30 dark:border-gray-medium/30 rounded-lg px-4 py-2.5 pr-10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 cursor-pointer min-w-[160px]"
                    >
                      <option value="createdAt">Trier par date</option>
                      <option value="firstName">Trier par nom</option>
                      <option value="email">Trier par email</option>
                      <option value="role">Trier par rôle</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-medium dark:text-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- Bouton ordre de tri -->
                  <button
                    @click="toggleSort(sortBy)"
                    class="flex items-center justify-center w-11 h-11 bg-white dark:bg-gray-darkest border border-gray-light/30 dark:border-gray-medium/30 rounded-lg text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all duration-300"
                    :title="sortOrder === 'asc' ? 'Tri croissant' : 'Tri décroissant'"
                  >
                    <svg 
                      class="w-4 h-4 transition-transform duration-300"
                      :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Compteur et reset -->
                <div class="flex items-center gap-4">
                  <div class="text-sm font-medium text-gray-medium dark:text-gray-light">
                    {{ filteredUsers.length }} / {{ users.length }} utilisateurs
                  </div>
                  
                  <button
                    @click="resetFilters"
                    class="flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            <div class="border border-gray-light/20 dark:border-gray-medium/20 rounded-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[600px]">
                  <thead class="bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
                    <tr>
                      <th 
                        @click="toggleSort('firstName')"
                        class="text-left p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Utilisateur</span>
                          <svg 
                            v-if="sortBy === 'firstName'"
                            class="w-3 h-3 transition-transform"
                            :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        </div>
                      </th>
                      <th 
                        @click="toggleSort('email')"
                        class="text-left p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center space-x-1">
                          <span>Email</span>
                          <svg 
                            v-if="sortBy === 'email'"
                            class="w-3 h-3 transition-transform"
                            :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        </div>
                      </th>
                      <th 
                        @click="toggleSort('role')"
                        class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center justify-center space-x-1">
                          <span>Rôle</span>
                          <svg 
                            v-if="sortBy === 'role'"
                            class="w-3 h-3 transition-transform"
                            :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        </div>
                      </th>
                      <th 
                        @click="toggleSort('createdAt')"
                        class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center justify-center space-x-1">
                          <span>Date d'inscription</span>
                          <svg 
                            v-if="sortBy === 'createdAt'"
                            class="w-3 h-3 transition-transform"
                            :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-light/20 dark:divide-gray-medium/20 bg-white dark:bg-gray-darkest">
                    <!-- Message si aucun résultat -->
                    <tr v-if="filteredUsers.length === 0" class="text-center">
                      <td colspan="4" class="py-12">
                        <div class="text-gray-medium dark:text-gray-light">
                          <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                          </svg>
                          <p class="text-lg font-medium mb-2">Aucun utilisateur trouvé</p>
                          <p class="text-sm">Essayez de modifier vos critères de recherche</p>
                        </div>
                      </td>
                    </tr>
                    
                    <tr 
                      v-for="user in filteredUsers" 
                      :key="user.id"
                      class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                    >
                      <td class="p-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white dark:text-black font-semibold text-sm">
                              {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                            </span>
                          </div>
                          <div class="min-w-0">
                            <p class="font-medium text-black dark:text-white truncate">
                              {{ user.firstName }} {{ user.lastName }}
                            </p>
                            <p v-if="user.gender" class="text-sm text-gray-medium dark:text-gray-light">
                              {{ user.gender === 'M' ? 'Homme' : 'Femme' }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="p-4">
                        <p class="text-black dark:text-white truncate">{{ user.email }}</p>
                      </td>
                      <td class="p-4 text-center">
                        <span 
                          :class="user.role === 'admin' 
                            ? 'bg-gradient-to-r from-success to-warning text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap' 
                            : 'bg-gray-light/20 dark:bg-gray-medium/20 text-gray-dark dark:text-gray-light px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap'"
                        >
                          {{ user.role === 'admin' ? 'Admin' : 'Utilisateur' }}
                        </span>
                      </td>
                      <td class="p-4 text-center">
                        <p class="text-black dark:text-white text-sm whitespace-nowrap">
                          {{ formatDate(user.createdAt) }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Gestion des Rôles -->
    <div 
      v-if="showRolesModal"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      @click="showRolesModal = false"
    >
      <div 
        class="card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- En-tête du modal -->
        <div class="flex justify-between items-center p-6 border-b border-gray-light/20 dark:border-gray-medium/20">
          <div>
            <h3 class="text-2xl font-light text-gradient">
              Gestion des Rôles
            </h3>
            <p class="text-gray-medium dark:text-gray-light mt-1">
              Modifier les permissions des utilisateurs
            </p>
          </div>
          <button 
            @click="showRolesModal = false"
            class="text-gray-medium dark:text-gray-light hover:text-black dark:hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Contenu du modal avec scroll -->
        <div class="flex-1 overflow-y-auto">
          <!-- État de chargement -->
          <div v-if="isLoadingRoles" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>

          <!-- Erreur -->
          <div v-else-if="rolesError" class="text-center py-12 px-6">
            <div class="text-red-500 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 class="text-xl font-semibold mb-2">Erreur de chargement</h4>
              <p class="text-gray-medium">{{ rolesError }}</p>
            </div>
            <button @click="loadRoleUsers" class="btn btn-primary">
              Réessayer
            </button>
          </div>

          <!-- Liste des utilisateurs pour gestion des rôles -->
          <div v-else class="px-6 pb-6">
            <div class="mb-6">
              <div class="bg-gradient-to-r from-warning/10 to-success/10 dark:from-warning/5 dark:to-success/5 border border-warning/20 dark:border-warning/10 rounded-xl p-4">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.694-.833-3.464 0L.165 16.5C-.605 17.333.357 19 1.897 19z"></path>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-warning dark:text-warning mb-1">
                      Attention
                    </p>
                    <p class="text-sm text-gray-dark dark:text-gray-light">
                      La modification des rôles affecte les permissions d'accès. Les administrateurs ont accès au panneau d'administration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="border border-gray-light/20 dark:border-gray-medium/20 rounded-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[500px]">
                  <thead class="bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
                    <tr>
                      <th class="text-left p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                        Utilisateur
                      </th>
                      <th class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                        Rôle Actuel
                      </th>
                      <th class="text-center p-4 font-semibold text-sm uppercase tracking-wider text-gray-medium dark:text-gray-light">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-light/20 dark:divide-gray-medium/20 bg-white dark:bg-gray-darkest">
                    <tr 
                      v-for="roleUser in roleUsers" 
                      :key="roleUser.id"
                      class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                    >
                      <td class="p-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white dark:text-black font-semibold text-sm">
                              {{ roleUser.firstName.charAt(0) }}{{ roleUser.lastName.charAt(0) }}
                            </span>
                          </div>
                          <div class="min-w-0">
                            <p class="font-medium text-black dark:text-white truncate">
                              {{ roleUser.firstName }} {{ roleUser.lastName }}
                            </p>
                            <p class="text-sm text-gray-medium dark:text-gray-light truncate">
                              {{ roleUser.email }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="p-4 text-center">
                        <span 
                          :class="roleUser.role === 'admin' 
                            ? 'bg-gradient-to-r from-success to-warning text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap inline-flex items-center space-x-1' 
                            : 'bg-gray-light/20 dark:bg-gray-medium/20 text-gray-dark dark:text-gray-light px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap inline-flex items-center space-x-1'"
                        >
                          <svg v-if="roleUser.role === 'admin'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                          <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>{{ roleUser.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}</span>
                        </span>
                      </td>
                      <td class="p-4 text-center">
                        <div class="flex justify-center space-x-2">
                          <button
                            v-if="roleUser.role !== 'admin'"
                            @click="updateUserRole(roleUser.id, 'admin')"
                            :disabled="isUpdatingRole"
                            class="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-success to-warning text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            Promouvoir Admin
                          </button>
                          
                          <button
                            v-if="roleUser.role === 'admin' && roleUser.id !== user?.id"
                            @click="updateUserRole(roleUser.id, 'user')"
                            :disabled="isUpdatingRole"
                            class="inline-flex items-center px-3 py-1.5 bg-gray-light/20 dark:bg-gray-medium/20 text-gray-dark dark:text-gray-light text-xs font-medium rounded-lg hover:bg-gray-light/40 dark:hover:bg-gray-medium/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Rétrograder Utilisateur
                          </button>

                          <span
                            v-if="roleUser.role === 'admin' && roleUser.id === user?.id"
                            class="inline-flex items-center px-3 py-1.5 bg-gray-light/10 dark:bg-gray-medium/10 text-gray-medium dark:text-gray-light text-xs font-medium rounded-lg"
                          >
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            Votre compte
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
const { getAdminStats, getAllUsers } = useDatabase()

// Statistiques réactives
const stats = reactive({
  totalUsers: 0,
  totalAdmins: 0,
  activeToday: 0
})

// État de chargement
const isLoading = ref(true)
const isLoadingUsers = ref(false)
const showUsersModal = ref(false)
const users = ref<any[]>([])
const usersError = ref<string | null>(null)

// États pour la recherche et les filtres
const searchTerm = ref('')
const roleFilter = ref('')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

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

// Actions d'administration
const viewUsers = async () => {
  showUsersModal.value = true
  await loadUsers()
}

// Fonction pour charger les utilisateurs
const loadUsers = async () => {
  isLoadingUsers.value = true
  usersError.value = null
  
  try {
    const result = await getAllUsers()
    if (result.success && result.data) {
      users.value = result.data
    } else {
      usersError.value = result.error || 'Erreur lors du chargement des utilisateurs'
    }
  } catch (err) {
    console.error('Erreur lors du chargement des utilisateurs:', err)
    usersError.value = 'Erreur lors du chargement des utilisateurs'
  } finally {
    isLoadingUsers.value = false
  }
}

// Utilisateurs filtrés et triés
const filteredUsers = computed(() => {
  let filtered = [...users.value]

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

  // Tri
  filtered.sort((a, b) => {
    let aVal = a[sortBy.value]
    let bVal = b[sortBy.value]

    // Gestion spéciale pour les dates
    if (sortBy.value === 'createdAt') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }
    
    // Gestion des chaînes
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return filtered
})

// Fonction pour changer le tri
const toggleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

// Fonction pour réinitialiser les filtres
const resetFilters = () => {
  searchTerm.value = ''
  roleFilter.value = ''
  sortBy.value = 'createdAt'
  sortOrder.value = 'desc'
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

const createUser = () => {
  alert('Fonctionnalité "Créer un utilisateur" - À implémenter')
}

const showRolesModal = ref(false)
const isLoadingRoles = ref(false)
const rolesError = ref<string | null>(null)
const roleUsers = ref<any[]>([])
const isUpdatingRole = ref(false)

const manageRoles = async () => {
  showRolesModal.value = true
  await loadRoleUsers()
}

// Fonction pour charger les utilisateurs pour la gestion des rôles
const loadRoleUsers = async () => {
  isLoadingRoles.value = true
  rolesError.value = null
  
  try {
    const result = await getAllUsers()
    if (result.success && result.data) {
      roleUsers.value = result.data
    } else {
      rolesError.value = result.error || 'Erreur lors du chargement des utilisateurs'
    }
  } catch (err) {
    console.error('Erreur lors du chargement des utilisateurs:', err)
    rolesError.value = 'Erreur lors du chargement des utilisateurs'
  } finally {
    isLoadingRoles.value = false
  }
}

// Fonction pour mettre à jour le rôle d'un utilisateur
const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
  isUpdatingRole.value = true
  rolesError.value = null
  
  try {
    const requestBody = { 
      userId: userId,
      role: newRole 
    }
    
    const response = await $fetch('/api/admin/update-user-role', {
      method: 'PUT',
      body: requestBody
    })
    
    if (response.success) {
      // Mettre à jour localement
      const userIndex = roleUsers.value.findIndex(u => u.id === userId)
      if (userIndex !== -1) {
        roleUsers.value[userIndex].role = newRole
      }
      
      // Recharger les stats
      await loadAdminStats()
    } else {
      rolesError.value = response.message || 'Erreur lors de la mise à jour du rôle'
    }
  } catch (err: any) {
    console.error('Erreur lors de la mise à jour du rôle:', err)
    rolesError.value = err?.data?.message || err?.message || 'Erreur lors de la mise à jour du rôle'
  } finally {
    isUpdatingRole.value = false
  }
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