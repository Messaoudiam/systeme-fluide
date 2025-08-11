<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-2xl font-light text-gradient mb-4">Calcul en cours...</div>
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
    </div>
  </div>
  <div v-else-if="results && userProfile"
    class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-8 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-light text-gradient mb-4">
          Vos Résultats TDEE
        </h1>
        <p class="text-lg text-gray-medium dark:text-gray-light">
          {{ userProfile?.gender === 'male' ? 'Homme' : 'Femme' }} • {{ userProfile?.age }} ans • {{ userProfile?.weight }} kg • {{ userProfile?.height }} cm
        </p>
      </div>

      <!-- Back Button -->
      <div class="mb-8 animate-fade-in delay-300">
        <NuxtLink to="/calculateur-tdee" class="btn btn-outline px-6 py-3">
          ← Nouveau calcul
        </NuxtLink>
      </div>

      <!-- Main Results Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in delay-500">
        <!-- Main TDEE Card -->
        <div class="lg:col-span-2">
          <div class="card p-8">
            <h2 class="text-2xl font-medium text-black dark:text-white mb-6 text-center">
              Vos Besoins Caloriques de Maintenance
            </h2>
            
            <div class="text-center mb-8">
              <div class="text-6xl font-light text-gradient mb-2">
                {{ Math.round(results.tdee).toLocaleString() }}
              </div>
              <div class="text-xl text-gray-medium dark:text-gray-light">
                calories par jour
              </div>
              <div class="text-lg text-gray-medium dark:text-gray-light mt-2">
                {{ Math.round(results.tdee * 7).toLocaleString() }} calories par semaine
              </div>
            </div>

            <!-- Activity Levels Breakdown -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-black dark:text-white mb-4">
                Besoins selon votre niveau d'activité
              </h3>
              
              <div class="space-y-3">
                <div 
                  v-for="activity in activityBreakdown"
                  :key="activity.multiplier"
                  :class="[
                    'flex justify-between items-center p-4 rounded-xl transition-all duration-300',
                    activity.multiplier === userProfile?.activityLevel
                      ? 'bg-gradient-to-r from-black/10 to-gray-darkest/5 dark:from-white/10 dark:to-white/5 shadow-md border-2 border-black/20 dark:border-white/20'
                      : 'bg-gray-light/20 dark:bg-gray-medium/20'
                  ]"
                >
                  <div>
                    <div class="font-medium text-black dark:text-white">
                      {{ activity.label }}
                    </div>
                    <div class="text-sm text-gray-medium dark:text-gray-light">
                      {{ activity.description }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-medium text-black dark:text-white">
                      {{ Math.round(results.bmr * activity.multiplier).toLocaleString() }}
                    </div>
                    <div class="text-sm text-gray-medium dark:text-gray-light">
                      calories/jour
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="space-y-6">
          <!-- BMR Card -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-black dark:text-white mb-4">
              Métabolisme Basal (BMR)
            </h3>
            <div class="text-3xl font-light text-gradient mb-2">
              {{ Math.round(results.bmr).toLocaleString() }}
            </div>
            <div class="text-sm text-gray-medium dark:text-gray-light">
              calories par jour au repos
            </div>
            <div class="text-xs text-gray-medium dark:text-gray-light mt-2">
              Formule {{ results.bmrFormula }}
            </div>
          </div>

          <!-- BMI Card -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-black dark:text-white mb-4">
              Indice de Masse Corporelle
            </h3>
            <div class="text-3xl font-light text-gradient mb-2">
              {{ results.bmi.toFixed(1) }}
            </div>
            <div 
              :class="[
                'text-sm font-medium',
                results.bmiCategory === 'Poids normal' ? 'text-green-600 dark:text-green-400' :
                results.bmiCategory === 'Surpoids' ? 'text-orange-600 dark:text-orange-400' :
                results.bmiCategory === 'Obésité' ? 'text-red-600 dark:text-red-400' :
                'text-blue-600 dark:text-blue-400'
              ]"
            >
              {{ results.bmiCategory }}
            </div>
          </div>

        </div>
      </div>



      <!-- Integration CTA -->
      <div class="mt-12 card p-8 text-center animate-fade-in delay-700">
        <h3 class="text-2xl font-medium text-black dark:text-white mb-4">
          Prêt à intégrer ces données ?
        </h3>
        <p class="text-gray-medium dark:text-gray-light mb-6 max-w-2xl mx-auto">
          Utilisez vos résultats TDEE pour définir vos objectifs caloriques dans votre dashboard Système Fluide
        </p>
        <NuxtLink to="/dashboard" class="btn btn-primary px-8 py-4 text-lg">
          Aller au Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserProfile {
  gender: 'male' | 'female'
  age: number
  weight: number
  height: number
  activityLevel: number
  bodyFat?: number
}

interface Results {
  bmr: number
  bmrFormula: string
  tdee: number
  bmi: number
  bmiCategory: string
}

// Désactiver SSR pour éviter les erreurs de query parsing
definePageMeta({
  ssr: false
})

const route = useRoute()
const pending = ref(true)

// Parse query parameters avec protection client-side
const userProfile = ref<UserProfile | null>(null)

onMounted(() => {
  // Parse seulement côté client
  const profile: UserProfile = {
    gender: route.query.gender as 'male' | 'female',
    age: Number(route.query.age),
    weight: Number(route.query.weight),
    height: Number(route.query.height),
    activityLevel: Number(route.query.activity),
    bodyFat: route.query.bodyFat ? Number(route.query.bodyFat) : undefined
  }

  // Validate required parameters
  if (!profile.gender || !profile.age || !profile.weight || !profile.height || !profile.activityLevel) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Paramètres manquants'
    })
  }

  userProfile.value = profile
  pending.value = false
})

// Activity levels for breakdown display
const activityBreakdown = [
  { multiplier: 1.2, label: 'Sédentaire', description: 'Peu ou pas d\'exercice' },
  { multiplier: 1.375, label: 'Légèrement actif', description: 'Exercice léger 1-3x/semaine' },
  { multiplier: 1.55, label: 'Modérément actif', description: 'Exercice modéré 3-5x/semaine' },
  { multiplier: 1.725, label: 'Très actif', description: 'Exercice intense 6-7x/semaine' },
  { multiplier: 1.9, label: 'Extrêmement actif', description: 'Exercice très intense' }
]

// BMR Calculations
const calculateBMR = (profile: UserProfile) => {
  const { gender, age, weight, height, bodyFat } = profile
  
  // Katch-McArdle (most accurate if body fat is known)
  if (bodyFat) {
    const leanBodyMass = weight * (1 - bodyFat / 100)
    return {
      bmr: 370 + (21.6 * leanBodyMass),
      formula: 'Katch-McArdle'
    }
  }
  
  // Mifflin-St Jeor (recommended)
  let bmr: number
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
  }
  
  return {
    bmr,
    formula: 'Mifflin-St Jeor'
  }
}

// BMI Calculation
const calculateBMI = (weight: number, height: number) => {
  const bmi = weight / Math.pow(height / 100, 2)
  
  let category: string
  if (bmi < 18.5) category = 'Insuffisance pondérale'
  else if (bmi < 25) category = 'Poids normal'
  else if (bmi < 30) category = 'Surpoids'
  else category = 'Obésité'
  
  return { bmi, category }
}

// Calculate all results - computed pour réactivité
const results = computed<Results | null>(() => {
  if (!userProfile.value) return null
  
  const profile = userProfile.value
  const bmrResult = calculateBMR(profile)
  const bmiResult = calculateBMI(profile.weight, profile.height)

  return {
    bmr: bmrResult.bmr,
    bmrFormula: bmrResult.formula,
    tdee: bmrResult.bmr * profile.activityLevel,
    bmi: bmiResult.bmi,
    bmiCategory: bmiResult.category
  }
})

// Meta tags optimisées pour CSR - seulement si les résultats sont disponibles
watch([results, userProfile], () => {
  if (results.value && userProfile.value) {
    useHead({
      title: `Vos Résultats TDEE: ${Math.round(results.value.tdee)} Calories/Jour | BMR ${Math.round(results.value.bmr)} | Système Fluide`,
      meta: [
        {
          name: 'description',
          content: `Résultats TDEE personnalisés: ${Math.round(results.value.tdee)} calories/jour, BMR ${Math.round(results.value.bmr)}, IMC ${results.value.bmi.toFixed(1)} (${results.value.bmiCategory}).`
        },
        {
          name: 'keywords',
          content: `TDEE ${Math.round(results.value.tdee)} calories, BMR ${Math.round(results.value.bmr)}, IMC ${results.value.bmi.toFixed(1)}, ${userProfile.value.gender === 'male' ? 'homme' : 'femme'} ${userProfile.value.age} ans`
        },
        {
          property: 'og:title',
          content: `Résultats TDEE: ${Math.round(results.value.tdee)} Calories par Jour`
        },
        {
          property: 'og:description',
          content: `TDEE: ${Math.round(results.value.tdee)} cal/jour • BMR: ${Math.round(results.value.bmr)} • IMC: ${results.value.bmi.toFixed(1)}`
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'robots',
          content: 'noindex, follow'
        },
        {
          name: 'author',
          content: 'Système Fluide'
        }
      ]
    })
  }
}, { immediate: true })
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