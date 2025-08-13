<template>
  <div
    class="min-h-screen bg-gradient-to-br from-off-white via-white to-off-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]"
    />
    <div class="relative z-10">

      <main class="max-w-7xl mx-auto px-6 py-8">
        <!-- Welcome message -->
        <div class="mb-8 text-center animate-fade-in">
          <h2
            class="text-2xl md:text-3xl font-light text-black dark:text-white mb-2"
          >
            Bonjour ! 👋
          </h2>
          <p class="text-gray-medium dark:text-gray-light">
            Voici votre progression du jour
          </p>
        </div>

        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in delay-300">
          <!-- Calories -->
          <div
            class="card-metric p-6 group cursor-pointer relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider"
                >
                  Calories
                </h3>
                <div
                  class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-light text-black dark:text-white mb-2">
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ dailyStats.calories || "0" }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-medium"
              >
                kcal consommées
              </p>
            </div>
          </div>

          <!-- Poids -->
          <div
            class="card-metric p-6 group cursor-pointer relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider"
                >
                  Poids
                </h3>
                <div
                  class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-light text-black dark:text-white mb-2">
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ dailyStats.weight || "0" }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-medium"
              >
                kg ce matin
              </p>
            </div>
          </div>

          <!-- Pas -->
          <div
            class="card-metric p-6 group cursor-pointer relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider"
                >
                  Pas
                </h3>
                <div
                  class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-light text-black dark:text-white mb-2">
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ dailyStats.steps?.toLocaleString() || "0" }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-medium"
              >
                pas aujourd'hui
              </p>
            </div>
          </div>

          <!-- Entraînement -->
          <div
            class="card-metric p-6 group cursor-pointer relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xs font-semibold text-gray-medium dark:text-gray-light uppercase tracking-wider"
                >
                  Entraînement
                </h3>
                <div
                  class="w-10 h-10 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-light text-black dark:text-white mb-2">
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ dailyStats.workout ? "Oui" : "Non" }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-medium"
              >
                <span v-if="isLoading" class="animate-pulse">Chargement...</span>
                <span v-else>{{ dailyStats.workoutName || "Pas d'entraînement" }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Input Form -->
        <div class="card p-8 mb-12 relative overflow-hidden animate-fade-in delay-500">
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-warning to-error"
          />
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-light text-gradient mb-2">
                Saisie quotidienne
              </h2>
              <p class="text-gray-medium dark:text-gray-light">
                Renseignez vos données du jour
              </p>
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-success to-warning rounded-2xl flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>

          <form class="space-y-8" @submit.prevent="saveDailyData">
            <!-- Sélecteur de date -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3">
                Date de saisie
              </label>
              <input
                v-model="formData.selectedDate"
                type="date"
                class="input-modern w-full md:w-auto"
                @change="onDateChange"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Calories et Macros -->
              <div class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-success to-success/70 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-black dark:text-white">
                    Nutrition
                  </h3>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Calories totales</label
                    >
                    <input
                      v-model.number="formData.calories"
                      type="number"
                      placeholder="2000"
                      class="input-modern"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Protéines (g)</label
                    >
                    <input
                      v-model.number="formData.proteins"
                      type="number"
                      placeholder="150"
                      class="input-modern"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Glucides (g)</label
                    >
                    <input
                      v-model.number="formData.carbs"
                      type="number"
                      placeholder="200"
                      class="input-modern"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Lipides (g)</label
                    >
                    <input
                      v-model.number="formData.fats"
                      type="number"
                      placeholder="80"
                      class="input-modern"
                    >
                  </div>
                </div>
              </div>

              <!-- Poids et Activité -->
              <div class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-warning to-warning/70 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-black dark:text-white">
                    Métriques physiques
                  </h3>
                </div>
                <div class="space-y-4">
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Poids (kg)</label
                    >
                    <input
                      v-model.number="formData.weight"
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      class="input-modern"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                      >Nombre de pas</label
                    >
                    <input
                      v-model.number="formData.steps"
                      type="number"
                      placeholder="8000"
                      class="input-modern"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Entraînement -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-black dark:text-white">
                  Entraînement
                </h3>
              </div>

              <div class="glass-strong p-6 rounded-2xl">
                <label class="flex items-center space-x-4 cursor-pointer group">
                  <div class="relative">
                    <input
                      v-model="formData.workout"
                      type="checkbox"
                      class="w-6 h-6 text-success border-2 border-gray-light dark:border-gray-medium rounded-lg focus:ring-2 focus:ring-success/20 transition-all duration-300"
                    >
                    <div
                      class="absolute inset-0 bg-success/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <span
                    class="text-black dark:text-white font-medium group-hover:text-success transition-colors duration-300"
                    >J'ai fait un entraînement aujourd'hui</span
                  >
                </label>

                <div v-if="formData.workout" class="mt-6 animate-fade-in">
                  <label
                    class="block text-sm font-semibold text-gray-medium dark:text-gray-light mb-3"
                    >Nom de l'entraînement</label
                  >
                  <input
                    v-model="formData.workoutName"
                    type="text"
                    placeholder="Push (Pectoraux, Épaules, Triceps)"
                    class="input-modern"
                  >
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="btn btn-primary px-12 py-4 text-lg relative overflow-hidden group"
              >
                <span class="relative z-10 flex items-center space-x-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Sauvegarder la journée</span>
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </button>
            </div>
          </form>
        </div>

        <!-- Progress Overview -->
        <div class="card p-8 relative overflow-hidden animate-fade-in delay-700">
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-warning via-error to-success"
          />

          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-light text-gradient mb-2">
                Tendances hebdomadaires
              </h2>
              <p class="text-gray-medium dark:text-gray-light">
                Vos moyennes sur 7 jours
              </p>
            </div>
            <div
              class="w-16 h-16 bg-gradient-to-br from-error to-success rounded-2xl flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="glass-strong p-6 rounded-xl text-center group hover-lift"
            >
              <div
                class="text-3xl font-light text-black dark:text-white mb-3 group-hover:text-success transition-colors duration-300"
              >
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ weeklyAverages.calories }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-semibold"
              >
                Calories moyenne
              </p>
            </div>
            <div
              class="glass-strong p-6 rounded-xl text-center group hover-lift"
            >
              <div
                class="text-3xl font-light text-black dark:text-white mb-3 group-hover:text-warning transition-colors duration-300"
              >
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ weeklyAverages.weight }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-semibold"
              >
                Poids moyen (kg)
              </p>
            </div>
            <div
              class="glass-strong p-6 rounded-xl text-center group hover-lift"
            >
              <div
                class="text-3xl font-light text-black dark:text-white mb-3 group-hover:text-error transition-colors duration-300"
              >
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ weeklyAverages.steps?.toLocaleString() }}</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-semibold"
              >
                Pas moyens
              </p>
            </div>
            <div
              class="glass-strong p-6 rounded-xl text-center group hover-lift"
            >
              <div
                class="text-3xl font-light text-black dark:text-white mb-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              >
                <span v-if="isLoading" class="animate-pulse">--</span>
                <span v-else>{{ weeklyAverages.workouts }}/7</span>
              </div>
              <p
                class="text-sm text-gray-medium dark:text-gray-light font-semibold"
              >
                Entraînements
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// Protection de la page - accès uniquement aux utilisateurs connectés
definePageMeta({
  middleware: 'auth'
})

// Data réactive pour le formulaire (sans .value pour éviter les erreurs SSR)
const formData = reactive<{
  selectedDate: string;
  calories: number | null;
  proteins: number | null;
  carbs: number | null;
  fats: number | null;
  weight: number | null;
  steps: number | null;
  workout: boolean;
  workoutName: string;
}>({
  selectedDate: new Date().toISOString().split('T')[0],
  calories: null,
  proteins: null,
  carbs: null,
  fats: null,
  weight: null,
  steps: null,
  workout: false,
  workoutName: "",
});

const { user } = useAuth()
const { getDailyStats, getWeeklyAverages, saveDailyData: saveUserDailyData } = useDatabase()

// Stats quotidiennes réactives
const dailyStats = reactive({
  calories: 0,
  weight: 0,
  steps: 0,
  workout: false,
  workoutName: "",
});

// Moyennes hebdomadaires réactives
const weeklyAverages = reactive({
  calories: 0,
  weight: 0,
  steps: 0,
  workouts: 0,
});

// États de chargement
const isLoading = ref(true)

// Charger les données au montage du composant
onMounted(async () => {
  if (user.value?.id) {
    await loadDashboardData()
    await loadFormData(formData.selectedDate)
  }
})

// Fonction pour charger toutes les données du dashboard
const loadDashboardData = async (date?: string) => {
  isLoading.value = true
  
  try {
    // Charger les stats quotidiennes pour la date spécifiée
    const dailyResult = await getDailyStats(user.value!.id, date)
    if (dailyResult.success && dailyResult.data) {
      Object.assign(dailyStats, dailyResult.data)
    }

    // Charger les moyennes hebdomadaires
    const weeklyResult = await getWeeklyAverages(user.value!.id)
    if (weeklyResult.success && weeklyResult.data) {
      Object.assign(weeklyAverages, weeklyResult.data)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  } finally {
    isLoading.value = false
  }
}

// Fonction pour pré-remplir le formulaire avec les données existantes
const loadFormData = async (date: string) => {
  try {
    const dailyResult = await getDailyStats(user.value!.id, date)
    if (dailyResult.success && dailyResult.data) {
      const data = dailyResult.data
      // Pré-remplir le formulaire avec les données existantes
      formData.calories = data.calories || null
      formData.proteins = data.proteins || null
      formData.carbs = data.carbs || null  
      formData.fats = data.fats || null
      formData.weight = data.weight || null  
      formData.steps = data.steps || null
      formData.workout = data.workout || false
      formData.workoutName = data.workoutName || ""
    } else {
      // Aucune donnée pour cette date - reset du formulaire
      formData.calories = null
      formData.proteins = null
      formData.carbs = null
      formData.fats = null
      formData.weight = null
      formData.steps = null
      formData.workout = false
      formData.workoutName = ""
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données du formulaire:', error)
  }
}

// Fonction appelée lors du changement de date
const onDateChange = () => {
  loadDashboardData(formData.selectedDate)
  loadFormData(formData.selectedDate)
}

// Date actuelle
const currentDate = computed(() => {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Fonction pour sauvegarder les données
const saveDailyData = async () => {
  if (!user.value?.id) {
    console.error("Erreur: utilisateur non connecté");
    return;
  }

  isLoading.value = true;

  try {
    const result = await saveUserDailyData(user.value.id, {
      date: formData.selectedDate,
      calories: formData.calories || undefined,
      proteins: formData.proteins || undefined,
      carbs: formData.carbs || undefined,
      fats: formData.fats || undefined,
      weight: formData.weight || undefined,
      steps: formData.steps || undefined,
      workout: formData.workout,
      workoutName: formData.workoutName || undefined,
    });

    if (result.success) {
      // Recharger les données du dashboard pour mettre à jour les statistiques
      await loadDashboardData(formData.selectedDate);

      // Ne pas reset le formulaire - garder les données saisies visibles
      // L'utilisateur peut ainsi voir ce qu'il a saisi et modifier si besoin
    } else {
      console.error("Erreur lors de la sauvegarde:", result.error);
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
  } finally {
    isLoading.value = false;
  }
};

// SEO
useHead({
  title: "Dashboard - Système Fluide",
  meta: [
    {
      name: "description",
      content:
        "Trackez quotidiennement vos calories, poids, pas et entraînements pour une progression optimale",
    },
  ],
});
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

.delay-700 {
  animation-delay: 0.7s;
}
</style>
