<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-light text-gradient mb-6">
          Calculateur TDEE
        </h1>
        <p class="text-xl text-gray-medium dark:text-gray-light leading-relaxed max-w-2xl mx-auto">
          Calculez vos besoins caloriques quotidiens avec précision grâce aux formules scientifiques reconnues
        </p>
      </div>

      <!-- Main Calculator Form -->
      <div class="card p-8 mb-8 animate-fade-in delay-300">
        <form @submit.prevent="calculateTDEE" class="space-y-8">
          <!-- Gender Selection -->
          <div class="space-y-3">
            <label class="block text-lg font-medium text-black dark:text-white">
              Genre
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="formData.gender = 'male'"
                :class="[
                  'btn p-4 text-lg transition-all duration-300',
                  formData.gender === 'male' 
                    ? 'btn-primary shadow-lg' 
                    : 'btn-outline'
                ]"
              >
                Homme
              </button>
              <button
                type="button"
                @click="formData.gender = 'female'"
                :class="[
                  'btn p-4 text-lg transition-all duration-300',
                  formData.gender === 'female' 
                    ? 'btn-primary shadow-lg' 
                    : 'btn-outline'
                ]"
              >
                Femme
              </button>
            </div>
          </div>

          <!-- Age Input -->
          <div class="space-y-3">
            <label for="age" class="block text-lg font-medium text-black dark:text-white">
              Âge (15-80 ans)
            </label>
            <input
              id="age"
              v-model.number="formData.age"
              type="number"
              min="15"
              max="80"
              required
              class="input-modern text-lg"
              placeholder="Ex: 25"
            />
          </div>

          <!-- Weight Input -->
          <div class="space-y-3">
            <label for="weight" class="block text-lg font-medium text-black dark:text-white">
              Poids (kg)
            </label>
            <input
              id="weight"
              v-model.number="formData.weight"
              type="number"
              min="30"
              max="300"
              step="0.1"
              required
              class="input-modern text-lg"
              placeholder="Ex: 70.5"
            />
          </div>

          <!-- Height Input -->
          <div class="space-y-3">
            <label for="height" class="block text-lg font-medium text-black dark:text-white">
              Taille (cm)
            </label>
            <input
              id="height"
              v-model.number="formData.height"
              type="number"
              min="120"
              max="250"
              required
              class="input-modern text-lg"
              placeholder="Ex: 175"
            />
          </div>

          <!-- Activity Level Selection -->
          <div class="space-y-3">
            <label class="block text-lg font-medium text-black dark:text-white">
              Niveau d'activité
            </label>
            <div class="space-y-3">
              <button
                type="button"
                v-for="activity in activityLevels"
                :key="activity.multiplier"
                @click="formData.activityLevel = activity.multiplier"
                :class="[
                  'w-full p-4 text-left rounded-xl transition-all duration-300 border-2',
                  formData.activityLevel === activity.multiplier
                    ? 'bg-gradient-to-r from-black/10 to-gray-darkest/10 dark:from-white/10 dark:to-white/5 border-black dark:border-white shadow-md'
                    : 'bg-white/50 dark:bg-gray-dark/50 border-gray-light/50 dark:border-gray-medium/50 hover:border-gray-medium dark:hover:border-gray-light'
                ]"
              >
                <div class="font-medium text-black dark:text-white mb-1">
                  {{ activity.label }}
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  {{ activity.description }}
                </div>
              </button>
            </div>
          </div>

          <!-- Body Fat Percentage (Optional) -->
          <div class="space-y-3">
            <label for="bodyFat" class="block text-lg font-medium text-black dark:text-white">
              Pourcentage de masse grasse (optionnel)
            </label>
            <input
              id="bodyFat"
              v-model.number="formData.bodyFat"
              type="number"
              min="5"
              max="50"
              step="0.1"
              class="input-modern text-lg"
              placeholder="Ex: 15.5"
            />
            <p class="text-sm text-gray-medium dark:text-gray-light">
              Si fourni, la formule Katch-McArdle sera utilisée pour plus de précision
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full btn btn-primary p-6 text-xl font-medium shadow-xl hover:shadow-2xl"
            :disabled="!isFormValid"
          >
            Calculer mon TDEE
          </button>
        </form>
      </div>

      <!-- Info Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in delay-500">
        <div class="card p-6">
          <h2 class="text-xl font-medium text-black dark:text-white mb-4">
            Qu'est-ce que le TDEE ?
          </h2>
          <p class="text-gray-medium dark:text-gray-light leading-relaxed">
            Le TDEE (Total Daily Energy Expenditure) représente le nombre total de calories que votre corps brûle en une journée, incluant votre métabolisme de base et vos activités physiques.
          </p>
        </div>

        <div class="card p-6">
          <h2 class="text-xl font-medium text-black dark:text-white mb-4">
            Formules scientifiques utilisées
          </h2>
          <ul class="text-gray-medium dark:text-gray-light space-y-2">
            <li>• <strong>Mifflin-St Jeor</strong> (recommandée, précision ±10%)</li>
            <li>• <strong>Harris-Benedict</strong> (classique, validée scientifiquement)</li>
            <li>• <strong>Katch-McArdle</strong> (si % masse grasse connu)</li>
          </ul>
        </div>
      </div>

      <!-- SEO Content Section -->
      <div class="space-y-8 mb-12 animate-fade-in delay-700">
        <!-- Why Use This Calculator -->
        <div class="card p-8">
          <h2 class="text-2xl font-medium text-black dark:text-white mb-6">
            Pourquoi utiliser notre calculateur TDEE gratuit ?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-medium dark:text-gray-light">
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-3">Précision scientifique</h3>
              <p class="leading-relaxed">
                Utilise les formules les plus précises validées par la recherche scientifique, avec calcul automatique du BMR (métabolisme basal) et multiplication par votre niveau d'activité.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-3">Résultats complets</h3>
              <p class="leading-relaxed">
                Obtenez non seulement votre TDEE, mais aussi votre IMC, poids idéal selon 4 formules, potentiel musculaire maximum et recommandations de macronutriments personnalisées.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-3">Gratuit et sans inscription</h3>
              <p class="leading-relaxed">
                Aucun compte requis, calcul instantané et résultats détaillés immédiatement disponibles. Interface moderne et responsive pour tous vos appareils.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-3">Intégration fitness</h3>
              <p class="leading-relaxed">
                Vos résultats s'intègrent parfaitement dans votre suivi Système Fluide pour un tracking optimal de vos 4 métriques essentielles.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="card p-8">
          <h2 class="text-2xl font-medium text-black dark:text-white mb-6">
            Questions fréquentes sur le calcul TDEE
          </h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Quelle est la différence entre BMR et TDEE ?
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Le BMR (métabolisme basal) est le nombre de calories brûlées au repos. Le TDEE inclut le BMR plus les calories brûlées par vos activités quotidiennes et exercices.
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                À quelle fréquence recalculer mon TDEE ?
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Recalculez votre TDEE lorsque votre poids change de plus de 2-3kg ou que votre niveau d'activité physique évolue significativement.
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Comment utiliser mon TDEE pour perdre du poids ?
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Pour perdre du poids, consommez 10-20% de calories en moins que votre TDEE. Notre calculateur propose automatiquement des recommandations pour la sèche (-20%).
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Quelle formule BMR choisir ?
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Mifflin-St Jeor est la plus précise pour la majorité des personnes. Katch-McArdle est plus précise si vous connaissez votre pourcentage de masse grasse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ActivityLevel {
  multiplier: number
  label: string
  description: string
}

interface FormData {
  gender: 'male' | 'female' | ''
  age: number | null
  weight: number | null
  height: number | null
  activityLevel: number | null
  bodyFat: number | null
}

const formData = reactive<FormData>({
  gender: '',
  age: null,
  weight: null,
  height: null,
  activityLevel: null,
  bodyFat: null
})

const activityLevels: ActivityLevel[] = [
  {
    multiplier: 1.2,
    label: 'Sédentaire',
    description: 'Peu ou pas d\'exercice, travail de bureau'
  },
  {
    multiplier: 1.375,
    label: 'Légèrement actif',
    description: 'Exercice léger 1-3 jours/semaine'
  },
  {
    multiplier: 1.55,
    label: 'Modérément actif',
    description: 'Exercice modéré 3-5 jours/semaine'
  },
  {
    multiplier: 1.725,
    label: 'Très actif',
    description: 'Exercice intense 6-7 jours/semaine'
  },
  {
    multiplier: 1.9,
    label: 'Extrêmement actif',
    description: 'Exercice physique très intense, travail physique'
  }
]

const isFormValid = computed(() => {
  return formData.gender && 
         formData.age && 
         formData.weight && 
         formData.height && 
         formData.activityLevel
})

const calculateTDEE = () => {
  if (!isFormValid.value) return

  const params = new URLSearchParams({
    gender: formData.gender,
    age: formData.age!.toString(),
    weight: formData.weight!.toString(),
    height: formData.height!.toString(),
    activity: formData.activityLevel!.toString()
  })

  if (formData.bodyFat) {
    params.append('bodyFat', formData.bodyFat.toString())
  }

  navigateTo(`/calculateur-tdee-resultats?${params.toString()}`)
}

useHead({
  title: 'Calculateur TDEE Gratuit - Calcul Besoins Caloriques Précis | Système Fluide',
  meta: [
    {
      name: 'description',
      content: 'Calculateur TDEE gratuit et précis. Calculez vos besoins caloriques quotidiens avec les formules Mifflin-St Jeor, Harris-Benedict et Katch-McArdle. BMR, IMC, poids idéal et macros inclus.'
    },
    {
      name: 'keywords',
      content: 'calculateur TDEE, calcul calories, besoins caloriques, BMR, métabolisme basal, IMC, poids idéal, macronutriments, nutrition, fitness'
    },
    {
      property: 'og:title',
      content: 'Calculateur TDEE Gratuit - Calcul Besoins Caloriques Précis'
    },
    {
      property: 'og:description',
      content: 'Calculez vos besoins caloriques quotidiens avec précision. Formules scientifiques validées, calcul BMR, IMC et recommandations macros personnalisées.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://votre-domaine.com/calculateur-tdee'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Calculateur TDEE Gratuit - Calcul Besoins Caloriques Précis'
    },
    {
      name: 'twitter:description',
      content: 'Calculez vos besoins caloriques quotidiens avec précision. Formules scientifiques validées.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'author',
      content: 'Système Fluide'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://votre-domaine.com/calculateur-tdee'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculateur TDEE Gratuit",
        "description": "Calculateur TDEE gratuit et précis pour calculer vos besoins caloriques quotidiens avec les formules scientifiques Mifflin-St Jeor, Harris-Benedict et Katch-McArdle",
        "url": "https://votre-domaine.com/calculateur-tdee",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "creator": {
          "@type": "Organization",
          "name": "Système Fluide",
          "url": "https://votre-domaine.com"
        },
        "featureList": [
          "Calcul TDEE avec formules scientifiques",
          "Calcul BMR (métabolisme basal)",
          "Calcul IMC et classification",
          "Estimation poids idéal (4 formules)",
          "Potentiel musculaire maximum",
          "Recommandations macronutriments"
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quelle est la différence entre BMR et TDEE ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le BMR (métabolisme basal) est le nombre de calories brûlées au repos. Le TDEE inclut le BMR plus les calories brûlées par vos activités quotidiennes et exercices."
            }
          },
          {
            "@type": "Question",
            "name": "À quelle fréquence recalculer mon TDEE ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Recalculez votre TDEE lorsque votre poids change de plus de 2-3kg ou que votre niveau d'activité physique évolue significativement."
            }
          },
          {
            "@type": "Question",
            "name": "Comment utiliser mon TDEE pour perdre du poids ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour perdre du poids, consommez 10-20% de calories en moins que votre TDEE. Notre calculateur propose automatiquement des recommandations pour la sèche (-20%)."
            }
          }
        ]
      })
    }
  ]
})
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