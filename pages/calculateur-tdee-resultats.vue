<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-light text-gradient mb-4">
          Vos Résultats TDEE
        </h1>
        <p class="text-lg text-gray-medium dark:text-gray-light">
          {{ userProfile.gender === 'male' ? 'Homme' : 'Femme' }} • {{ userProfile.age }} ans • {{ userProfile.weight }} kg • {{ userProfile.height }} cm
        </p>
      </div>

      <!-- Back Button -->
      <div class="mb-8">
        <NuxtLink to="/calculateur-tdee" class="btn btn-outline px-6 py-3">
          ← Nouveau calcul
        </NuxtLink>
      </div>

      <!-- Main Results Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                  :key="activity.level"
                  :class="[
                    'flex justify-between items-center p-4 rounded-xl transition-all duration-300',
                    activity.multiplier === userProfile.activityLevel
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

          <!-- Ideal Weight Range -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-black dark:text-white mb-4">
              Poids Idéal Estimé
            </h3>
            <div class="text-2xl font-light text-gradient mb-2">
              {{ results.idealWeight.min }}-{{ results.idealWeight.max }} kg
            </div>
            <div class="text-xs text-gray-medium dark:text-gray-light">
              Basé sur différentes formules scientifiques
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Ideal Weight Formulas -->
        <div class="card p-6">
          <h3 class="text-xl font-medium text-black dark:text-white mb-6">
            Formules de Poids Idéal
          </h3>
          <div class="space-y-4">
            <div v-for="formula in results.idealWeightFormulas" :key="formula.name" class="flex justify-between items-center">
              <div>
                <div class="font-medium text-black dark:text-white">
                  {{ formula.name }}
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  {{ formula.year }}
                </div>
              </div>
              <div class="text-lg font-medium text-black dark:text-white">
                {{ formula.weight }} kg
              </div>
            </div>
          </div>
        </div>

        <!-- Maximum Muscular Potential -->
        <div class="card p-6">
          <h3 class="text-xl font-medium text-black dark:text-white mb-6">
            Potentiel Musculaire Maximum
          </h3>
          <div class="space-y-4">
            <div class="text-center p-4 bg-gradient-to-r from-black/5 to-gray-darkest/5 dark:from-white/5 dark:to-white/5 rounded-xl">
              <div class="text-2xl font-light text-gradient mb-1">
                {{ results.maxMuscularPotential.at5Percent }} kg
              </div>
              <div class="text-sm text-gray-medium dark:text-gray-light">
                à 5% de masse grasse
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-medium text-black dark:text-white">
                {{ results.maxMuscularPotential.at10Percent }} kg à 10%
              </div>
              <div class="text-lg font-medium text-black dark:text-white">
                {{ results.maxMuscularPotential.at15Percent }} kg à 15%
              </div>
            </div>
            <div class="text-xs text-gray-medium dark:text-gray-light text-center">
              Formule Martin Berkhan
            </div>
          </div>
        </div>
      </div>

      <!-- Macronutrients Recommendations -->
      <div class="card p-8">
        <h3 class="text-2xl font-medium text-black dark:text-white mb-8 text-center">
          Recommandations de Macronutriments
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Maintenance -->
          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl">
            <h4 class="text-lg font-medium text-black dark:text-white mb-4">
              Maintenance
            </h4>
            <div class="text-2xl font-light text-gradient mb-4">
              {{ Math.round(results.tdee) }} cal/jour
            </div>
            <div class="space-y-2 text-sm">
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.maintenance.protein }}g</span> protéines
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.maintenance.fats }}g</span> lipides
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.maintenance.carbs }}g</span> glucides
              </div>
            </div>
          </div>

          <!-- Cutting -->
          <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl">
            <h4 class="text-lg font-medium text-black dark:text-white mb-4">
              Sèche (-20%)
            </h4>
            <div class="text-2xl font-light text-gradient mb-4">
              {{ Math.round(results.tdee * 0.8) }} cal/jour
            </div>
            <div class="space-y-2 text-sm">
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.cutting.protein }}g</span> protéines
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.cutting.fats }}g</span> lipides
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.cutting.carbs }}g</span> glucides
              </div>
            </div>
          </div>

          <!-- Bulking -->
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl">
            <h4 class="text-lg font-medium text-black dark:text-white mb-4">
              Prise de masse (+15%)
            </h4>
            <div class="text-2xl font-light text-gradient mb-4">
              {{ Math.round(results.tdee * 1.15) }} cal/jour
            </div>
            <div class="space-y-2 text-sm">
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.bulking.protein }}g</span> protéines
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.bulking.fats }}g</span> lipides
              </div>
              <div class="text-gray-dark dark:text-gray-light">
                <span class="font-medium">{{ results.macros.bulking.carbs }}g</span> glucides
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration CTA -->
      <div class="mt-12 card p-8 text-center">
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
  idealWeight: {
    min: number
    max: number
  }
  idealWeightFormulas: Array<{
    name: string
    year: string
    weight: number
  }>
  maxMuscularPotential: {
    at5Percent: number
    at10Percent: number
    at15Percent: number
  }
  macros: {
    maintenance: { protein: number; fats: number; carbs: number }
    cutting: { protein: number; fats: number; carbs: number }
    bulking: { protein: number; fats: number; carbs: number }
  }
}

const route = useRoute()

// Parse query parameters
const userProfile: UserProfile = {
  gender: route.query.gender as 'male' | 'female',
  age: Number(route.query.age),
  weight: Number(route.query.weight),
  height: Number(route.query.height),
  activityLevel: Number(route.query.activity),
  bodyFat: route.query.bodyFat ? Number(route.query.bodyFat) : undefined
}

// Validate required parameters
if (!userProfile.gender || !userProfile.age || !userProfile.weight || !userProfile.height || !userProfile.activityLevel) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Paramètres manquants'
  })
}

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

// Ideal Weight Calculations
const calculateIdealWeight = (profile: UserProfile) => {
  const { gender, height } = profile
  const heightInches = height / 2.54
  
  // Hamwi Formula
  let hamwi: number
  if (gender === 'male') {
    hamwi = 48 + 2.7 * (heightInches - 60)
  } else {
    hamwi = 45.5 + 2.2 * (heightInches - 60)
  }
  
  // Devine Formula
  let devine: number
  if (gender === 'male') {
    devine = 50 + 2.3 * (heightInches - 60)
  } else {
    devine = 45.5 + 2.3 * (heightInches - 60)
  }
  
  // Robinson Formula
  let robinson: number
  if (gender === 'male') {
    robinson = 52 + 1.9 * (heightInches - 60)
  } else {
    robinson = 49 + 1.7 * (heightInches - 60)
  }
  
  // Miller Formula
  let miller: number
  if (gender === 'male') {
    miller = 56.2 + 1.41 * (heightInches - 60)
  } else {
    miller = 53.1 + 1.36 * (heightInches - 60)
  }
  
  const weights = [hamwi, devine, robinson, miller]
  
  return {
    min: Math.round(Math.min(...weights)),
    max: Math.round(Math.max(...weights)),
    formulas: [
      { name: 'Hamwi', year: '1964', weight: Math.round(hamwi) },
      { name: 'Devine', year: '1974', weight: Math.round(devine) },
      { name: 'Robinson', year: '1983', weight: Math.round(robinson) },
      { name: 'Miller', year: '1983', weight: Math.round(miller) }
    ]
  }
}

// Maximum Muscular Potential (Martin Berkhan formula)
const calculateMaxMuscularPotential = (profile: UserProfile) => {
  const { height } = profile
  const heightInches = height / 2.54
  
  // Base calculation at 5% body fat
  const at5Percent = Math.round(2.205 * (heightInches - 70) + 86.4)
  const at10Percent = Math.round(at5Percent * 1.1)
  const at15Percent = Math.round(at5Percent * 1.18)
  
  return {
    at5Percent,
    at10Percent,
    at15Percent
  }
}

// Macronutrients calculation
const calculateMacros = (calories: number, weight: number) => {
  // 30/35/35 split (protein/fat/carbs)
  const proteinCals = calories * 0.30
  const fatCals = calories * 0.35
  const carbCals = calories * 0.35
  
  return {
    protein: Math.round(proteinCals / 4), // 4 cal per gram
    fats: Math.round(fatCals / 9), // 9 cal per gram
    carbs: Math.round(carbCals / 4) // 4 cal per gram
  }
}

// Calculate all results
const bmrResult = calculateBMR(userProfile)
const bmiResult = calculateBMI(userProfile.weight, userProfile.height)
const idealWeightResult = calculateIdealWeight(userProfile)
const maxMuscularResult = calculateMaxMuscularPotential(userProfile)

const results: Results = {
  bmr: bmrResult.bmr,
  bmrFormula: bmrResult.formula,
  tdee: bmrResult.bmr * userProfile.activityLevel,
  bmi: bmiResult.bmi,
  bmiCategory: bmiResult.category,
  idealWeight: {
    min: idealWeightResult.min,
    max: idealWeightResult.max
  },
  idealWeightFormulas: idealWeightResult.formulas,
  maxMuscularPotential: maxMuscularResult,
  macros: {
    maintenance: calculateMacros(bmrResult.bmr * userProfile.activityLevel, userProfile.weight),
    cutting: calculateMacros(bmrResult.bmr * userProfile.activityLevel * 0.8, userProfile.weight),
    bulking: calculateMacros(bmrResult.bmr * userProfile.activityLevel * 1.15, userProfile.weight)
  }
}

useHead({
  title: 'Résultats TDEE - Système Fluide',
  meta: [
    {
      name: 'description',
      content: `Vos résultats TDEE personnalisés: ${Math.round(results.tdee)} calories par jour. BMR, IMC, poids idéal et recommandations macronutriments.`
    }
  ]
})
</script>