<template>
  <div
    class="min-h-screen bg-gradient-to-br from-off-white via-white to-off-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px]"
    />

    <div class="relative z-10">
      <main class="max-w-7xl mx-auto px-6 py-12">
        <!-- Header Section -->
        <div class="text-center mb-16 animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-light text-gradient mb-6">
            Les Pyramides de Helms
          </h1>
          <p
            class="text-xl md:text-2xl text-gray-medium dark:text-gray-light mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            La hiérarchisation scientifique de la nutrition et de
            l'entraînement, démocratisée par Lucas Gouiffes dans le monde
            francophone
          </p>
          <div class="flex justify-center">
            <div
              class="w-24 h-1 bg-gradient-to-r from-success via-warning to-error rounded-full"
            />
          </div>
        </div>

        <!-- Video Section -->
        <div
          class="card p-8 mb-16 relative overflow-hidden animate-fade-in delay-300"
        >
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-warning to-error"
          />

          <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-light text-gradient mb-4">
              Vidéo explicative de Lucas Gouiffes
            </h2>
            <p class="text-gray-medium dark:text-gray-light">
              Découvrez la méthodologie complète directement de la source
            </p>
          </div>

          <div
            class="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            <iframe
              class="w-full aspect-video"
              src="https://www.youtube.com/embed/O152-aEsUe0"
              title="Les Pyramides de Helms - Lucas Gouiffes"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>

        <!-- Pyramid Tabs -->
        <div
          class="card p-8 mb-16 relative overflow-hidden animate-fade-in delay-500"
        >
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error via-warning to-success"
          />

          <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-light text-gradient mb-4">
              Les Deux Pyramides
            </h2>
            <p class="text-gray-medium dark:text-gray-light">
              Découvrez les pyramides de nutrition et d'entraînement d'Eric
              Helms
            </p>
          </div>

          <!-- Tab Navigation -->
          <div class="flex justify-center mb-12">
            <div class="glass-strong rounded-2xl p-2 flex space-x-2">
              <button
                :class="
                  activePyramid === 'nutrition'
                    ? 'btn btn-primary'
                    : 'btn btn-ghost'
                "
                class="px-6 py-3 rounded-xl transition-all duration-300"
                @click="activePyramid = 'nutrition'"
              >
                <div class="flex items-center space-x-2">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Nutrition</span>
                </div>
              </button>
              <button
                :class="
                  activePyramid === 'training'
                    ? 'btn btn-primary'
                    : 'btn btn-ghost'
                "
                class="px-6 py-3 rounded-xl transition-all duration-300"
                @click="activePyramid = 'training'"
              >
                <div class="flex items-center space-x-2">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>Entraînement</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Nutrition Pyramid -->
          <div
            v-if="activePyramid === 'nutrition'"
            key="nutrition"
            class="max-w-4xl mx-auto"
          >
            <div class="text-center mb-8">
              <h3 class="text-xl font-medium text-gradient mb-2">
                Pyramide Nutritionnelle
              </h3>
              <p class="text-gray-medium dark:text-gray-light text-sm">
                Cliquez sur chaque niveau pour plus de détails
              </p>
            </div>

            <!-- Level 5: Suppléments (Pointe - en haut) -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-sm mx-auto"
              :class="{ active: activeLevel === 5 }"
              @click="toggleLevel(5)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-black to-gray-darkest dark:from-white dark:to-off-white h-8 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-sm font-medium">5. Suppléments</h3>
                </div>
              </div>
            </div>

            <!-- Level 4: Timing -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-lg mx-auto"
              :class="{ active: activeLevel === 4 }"
              @click="toggleLevel(4)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-medium to-gray-light dark:from-gray-medium dark:to-gray-dark h-10 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-white">
                  <h3 class="text-sm font-medium">4. Timing Nutritionnel</h3>
                </div>
              </div>
            </div>

            <!-- Level 3: Micronutriments -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-xl mx-auto"
              :class="{ active: activeLevel === 3 }"
              @click="toggleLevel(3)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-dark to-gray-medium dark:from-gray-light dark:to-gray-medium h-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-base font-medium mb-1">3. Micronutriments</h3>
                  <p class="text-xs opacity-90">Vitamines, minéraux</p>
                </div>
              </div>
            </div>

            <!-- Level 2: Macronutriments -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-2xl mx-auto"
              :class="{ active: activeLevel === 2 }"
              @click="toggleLevel(2)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-darkest to-gray-dark dark:from-off-white dark:to-gray-light h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-lg font-medium mb-1">2. Macronutriments</h3>
                  <p class="text-sm opacity-90">Protéines, glucides, lipides</p>
                </div>
              </div>
            </div>

            <!-- Level 1: Balance Énergétique (Base - en bas) -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-3xl mx-auto"
              :class="{ active: activeLevel === 1 }"
              @click="toggleLevel(1)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-black to-gray-darkest dark:from-white dark:to-off-white h-20 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-xl font-medium mb-1">
                    1. Balance Énergétique
                  </h3>
                  <p class="text-sm opacity-90">
                    Le fondement - 80% de l'importance
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Training Pyramid -->
          <div
            v-else-if="activePyramid === 'training'"
            key="training"
            class="max-w-4xl mx-auto"
          >
            <div class="text-center mb-8">
              <h3 class="text-xl font-medium text-gradient mb-2">
                Pyramide d'Entraînement
              </h3>
              <p class="text-gray-medium dark:text-gray-light text-sm">
                Cliquez sur chaque niveau pour plus de détails
              </p>
            </div>

            <!-- Level 5: Tempo (Pointe - en haut) -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-sm mx-auto"
              :class="{ active: activeLevel === 10 }"
              @click="toggleLevel(10)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-black to-gray-darkest dark:from-white dark:to-off-white h-8 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-sm font-medium">5. Tempo</h3>
                </div>
              </div>
            </div>

            <!-- Level 4: Temps de repos -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-lg mx-auto"
              :class="{ active: activeLevel === 9 }"
              @click="toggleLevel(9)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-medium to-gray-light dark:from-gray-medium dark:to-gray-dark h-10 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-white">
                  <h3 class="text-sm font-medium">4. Temps de Repos</h3>
                </div>
              </div>
            </div>

            <!-- Level 3: Sélection des exercices -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-xl mx-auto"
              :class="{ active: activeLevel === 8 }"
              @click="toggleLevel(8)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-dark to-gray-medium dark:from-gray-light dark:to-gray-medium h-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-base font-medium mb-1">
                    3. Sélection des Exercices
                  </h3>
                  <p class="text-xs opacity-90">
                    Choix et ordre des mouvements
                  </p>
                </div>
              </div>
            </div>

            <!-- Level 2: Progression -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-2xl mx-auto"
              :class="{ active: activeLevel === 7 }"
              @click="toggleLevel(7)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-gray-darkest to-gray-dark dark:from-off-white dark:to-gray-light h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-lg font-medium mb-1">2. Progression</h3>
                  <p class="text-sm opacity-90">Surcharge progressive</p>
                </div>
              </div>
            </div>

            <!-- Level 1: Volume, Intensité, Fréquence (Base - en bas) -->
            <div
              class="pyramid-level mb-4 cursor-pointer group max-w-3xl mx-auto"
              :class="{ active: activeLevel === 6 }"
              @click="toggleLevel(6)"
            >
              <div
                class="pyramid-bar bg-gradient-to-r from-black to-gray-darkest dark:from-white dark:to-off-white h-20 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <div class="text-center text-white dark:text-black">
                  <h3 class="text-xl font-medium mb-1">
                    1. Volume, Intensité, Fréquence
                  </h3>
                  <p class="text-sm opacity-90">Les variables fondamentales</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Level Details -->
          <div v-if="activeLevel" class="mt-12 animate-fade-in">
            <div class="glass-strong p-8 rounded-2xl">
              <!-- NUTRITION PYRAMID LEVELS -->
              <div v-if="activeLevel === 1">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Balance Énergétique - Le Fondement
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-4"
                    >
                      Principe
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light leading-relaxed mb-4"
                    >
                      La balance énergétique détermine 80% de vos résultats en
                      composition corporelle. C'est la différence entre les
                      calories consommées et les calories dépensées.
                    </p>
                    <ul class="space-y-2 text-gray-medium dark:text-gray-light">
                      <li class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-success rounded-full" />
                        <span>Déficit = Perte de poids</span>
                      </li>
                      <li class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-warning rounded-full" />
                        <span>Maintenance = Stabilité</span>
                      </li>
                      <li class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-error rounded-full" />
                        <span>Surplus = Prise de poids</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-4"
                    >
                      Application Pratique
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light leading-relaxed mb-4"
                    >
                      Maîtriser sa balance énergétique avant tout autre
                      paramètre nutritionnel.
                    </p>
                    <div class="space-y-3">
                      <div class="p-4 bg-success/10 rounded-lg">
                        <p
                          class="text-sm font-medium text-black dark:text-white"
                        >
                          Déficit modéré: -300 à -500 kcal/jour
                        </p>
                      </div>
                      <div class="p-4 bg-warning/10 rounded-lg">
                        <p
                          class="text-sm font-medium text-black dark:text-white"
                        >
                          Surplus léger: +200 à +300 kcal/jour
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 2">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Macronutriments - L'Optimisation
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >P</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Protéines
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      1.6-2.2g/kg de poids de corps pour maintenir et construire
                      le muscle
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-gray-darkest to-gray-dark dark:from-off-white dark:to-gray-light rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >L</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Lipides
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      0.8-1.2g/kg minimum pour la santé hormonale et
                      l'absorption des vitamines
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-gray-dark to-gray-medium dark:from-gray-light dark:to-gray-medium rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >G</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Glucides
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      Le reste des calories après avoir fixé protéines et
                      lipides
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 3">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Micronutriments - La Santé
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Les vitamines, minéraux et oligoéléments sont essentiels
                    pour la santé générale et l'optimisation des performances.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      class="p-6 bg-gradient-to-br from-success/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-3"
                      >
                        Sources Prioritaires
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Légumes verts à feuilles</li>
                        <li>• Fruits colorés variés</li>
                        <li>• Poissons gras</li>
                        <li>• Noix et graines</li>
                      </ul>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-warning/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-3"
                      >
                        Suppléments de Base
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Vitamine D3</li>
                        <li>• Magnésium</li>
                        <li>• Oméga-3 (EPA/DHA)</li>
                        <li>• Multivitamines de qualité</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 4">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Timing Nutritionnel
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Le timing des repas a un impact mineur sur la composition
                    corporelle si les 3 premiers niveaux sont maîtrisés.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      class="p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Fenêtre post-entraînement
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Protéines dans les 2h après l'entraînement</li>
                        <li>• Glucides pour reconstituer le glycogène</li>
                        <li>• Pas d'urgence absolue</li>
                      </ul>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Répartition des repas
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• 3-4 repas par jour recommandés</li>
                        <li>• Distribution égale des protéines</li>
                        <li>• Adaptation selon le style de vie</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 5">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Suppléments
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Les suppléments représentent le niveau le moins impactant.
                    Ils sont utiles pour atteindre des objectifs spécifiques une
                    fois les bases maîtrisées.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      class="p-6 bg-gradient-to-br from-black/10 to-transparent dark:from-white/10 rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Suppléments Performance
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Créatine monohydrate (3-5g/jour)</li>
                        <li>• Caféine pré-entraînement (200-400mg)</li>
                        <li>• Whey protéine si apports insuffisants</li>
                      </ul>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-black/10 to-transparent dark:from-white/10 rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Principes
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Pas de suppléments sans bases solides</li>
                        <li>• Privilégier la nourriture complète</li>
                        <li>• Efficacité scientifiquement prouvée</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TRAINING PYRAMID LEVELS -->
              <div v-else-if="activeLevel === 6">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Volume, Intensité, Fréquence - Les Fondamentaux
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >V</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Volume
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      Nombre total de séries par groupe musculaire par semaine
                      (10-20 séries optimal)
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-gray-darkest to-gray-dark dark:from-off-white dark:to-gray-light rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >I</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Intensité
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      Charge utilisée, généralement 65-85% de votre 1RM pour
                      l'hypertrophie
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-gray-dark to-gray-medium dark:from-gray-light dark:to-gray-medium rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <span class="text-white dark:text-black font-bold text-lg"
                        >F</span
                      >
                    </div>
                    <h4
                      class="text-lg font-medium text-black dark:text-white mb-2"
                    >
                      Fréquence
                    </h4>
                    <p
                      class="text-gray-medium dark:text-gray-light text-sm leading-relaxed"
                    >
                      Nombre de fois qu'un muscle est entraîné par semaine
                      (2x/semaine optimal)
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 7">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Progression - La Surcharge Progressive
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    La surcharge progressive est le principe fondamental pour
                    stimuler continuellement l'adaptation musculaire.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      class="p-6 bg-gradient-to-br from-warning/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Méthodes de Progression
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Augmentation du poids</li>
                        <li>• Augmentation des répétitions</li>
                        <li>• Augmentation du nombre de séries</li>
                        <li>• Amélioration de la technique</li>
                      </ul>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-warning/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Principe
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Progression graduelle et constante</li>
                        <li>• Suivi rigoureux des performances</li>
                        <li>• Adaptation du stimulus d'entraînement</li>
                        <li>• Périodisation sur le long terme</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 8">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Sélection des Exercices
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Le choix et l'ordre des exercices influencent l'efficacité
                    de votre entraînement.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      class="p-6 bg-gradient-to-br from-error/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Exercices Composés
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Squat, développé couché, soulevé de terre</li>
                        <li>• Sollicitent plusieurs groupes musculaires</li>
                        <li>• Base de tout programme d'entraînement</li>
                        <li>• Progression de charge plus importante</li>
                      </ul>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-error/10 to-transparent rounded-xl"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Exercices d'Isolation
                      </h4>
                      <ul
                        class="space-y-2 text-gray-medium dark:text-gray-light"
                      >
                        <li>• Complètent les exercices composés</li>
                        <li>• Ciblent des muscles spécifiques</li>
                        <li>• Utiles pour corriger les déséquilibres</li>
                        <li>• Finition et volume supplémentaire</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 9">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Temps de Repos
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Les temps de repos influencent la récupération entre les
                    séries et l'adaptation musculaire.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                      class="p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl text-center"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Force
                      </h4>
                      <div
                        class="text-2xl font-light text-black dark:text-white mb-2"
                      >
                        3-5 min
                      </div>
                      <p class="text-gray-medium dark:text-gray-light text-sm">
                        Récupération complète du système ATP-PC
                      </p>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl text-center"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Hypertrophie
                      </h4>
                      <div
                        class="text-2xl font-light text-black dark:text-white mb-2"
                      >
                        1-3 min
                      </div>
                      <p class="text-gray-medium dark:text-gray-light text-sm">
                        Équilibre entre fatigue et récupération
                      </p>
                    </div>
                    <div
                      class="p-6 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl text-center"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-4"
                      >
                        Endurance
                      </h4>
                      <div
                        class="text-2xl font-light text-black dark:text-white mb-2"
                      >
                        30-90 sec
                      </div>
                      <p class="text-gray-medium dark:text-gray-light text-sm">
                        Maintien d'un stress métabolique élevé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeLevel === 10">
                <h3 class="text-2xl font-light text-black dark:text-white mb-6">
                  Tempo d'Exécution
                </h3>
                <div class="space-y-6">
                  <p
                    class="text-gray-medium dark:text-gray-light leading-relaxed"
                  >
                    Le tempo contrôle la vitesse d'exécution des mouvements et
                    influence le stimulus musculaire.
                  </p>
                  <div class="max-w-2xl mx-auto">
                    <div
                      class="p-8 bg-gradient-to-br from-black/10 to-transparent dark:from-white/10 rounded-xl text-center"
                    >
                      <h4
                        class="text-lg font-medium text-black dark:text-white mb-6"
                      >
                        Notation du Tempo
                      </h4>
                      <div
                        class="text-4xl font-light text-black dark:text-white mb-4"
                      >
                        3-1-2-0
                      </div>
                      <div
                        class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                      >
                        <div>
                          <div class="font-medium text-black dark:text-white">
                            3
                          </div>
                          <div class="text-gray-medium dark:text-gray-light">
                            Phase excentrique
                          </div>
                        </div>
                        <div>
                          <div class="font-medium text-black dark:text-white">
                            1
                          </div>
                          <div class="text-gray-medium dark:text-gray-light">
                            Pause en bas
                          </div>
                        </div>
                        <div>
                          <div class="font-medium text-black dark:text-white">
                            2
                          </div>
                          <div class="text-gray-medium dark:text-gray-light">
                            Phase concentrique
                          </div>
                        </div>
                        <div>
                          <div class="font-medium text-black dark:text-white">
                            0
                          </div>
                          <div class="text-gray-medium dark:text-gray-light">
                            Pause en haut
                          </div>
                        </div>
                      </div>
                      <p
                        class="text-gray-medium dark:text-gray-light text-sm mt-4"
                      >
                        Impact minimal sur l'hypertrophie si technique correcte
                        maintenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application dans Système Fluide -->
        <div
          class="card p-8 relative overflow-hidden animate-fade-in delay-700"
        >
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-warning to-success"
          />

          <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-light text-gradient mb-4">
              Application dans Système Fluide
            </h2>
            <p class="text-gray-medium dark:text-gray-light">
              Comment notre app vous aide à appliquer les pyramides de Helms
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
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
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Calories
              </h3>
              <p class="text-sm text-gray-medium dark:text-gray-light">
                Suivi quotidien pour maîtriser la balance énergétique
              </p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-warning to-warning/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
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
                    d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h1.246a1 1 0 01.736.327l1.04 1.147a1 1 0 00.736.326H15M9 15h6"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Macros
              </h3>
              <p class="text-sm text-gray-medium dark:text-gray-light">
                Tracking protéines, glucides et lipides
              </p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-error to-error/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Poids
              </h3>
              <p class="text-sm text-gray-medium dark:text-gray-light">
                Suivi quotidien de l'évolution corporelle
              </p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-8 h-8 text-white dark:text-black"
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
              <h3 class="text-lg font-medium text-black dark:text-white mb-2">
                Entraînement
              </h3>
              <p class="text-sm text-gray-medium dark:text-gray-light">
                Optimisation de la dépense énergétique
              </p>
            </div>
          </div>

          <div class="text-center mt-8">
            <NuxtLink to="/dashboard" class="btn btn-primary px-8 py-3 text-lg">
              Appliquer les pyramides maintenant
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeLevel = ref<number | null>(null);
const activePyramid = ref<"nutrition" | "training">("nutrition");

const toggleLevel = (level: number) => {
  activeLevel.value = activeLevel.value === level ? null : level;
};

// Reset active level when switching pyramids
watch(activePyramid, () => {
  activeLevel.value = null;
});

// SEO
useHead({
  title: "Pyramides de Helms - Système Fluide",
  meta: [
    {
      name: "description",
      content:
        "Découvrez les pyramides de nutrition et d'entraînement d'Eric Helms démocratisées par Lucas Gouiffes : la hiérarchisation scientifique pour optimiser vos résultats fitness.",
    },
    {
      name: "keywords",
      content:
        "pyramides de helms, lucas gouiffes, composition corporelle, nutrition, entraînement, fitness, balance énergétique, macronutriments, volume intensité fréquence",
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

.pyramid-level {
  transition: all 0.3s ease;
}

.pyramid-level.active .pyramid-bar {
  transform: scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.pyramid-bar {
  transition: all 0.3s ease;
}
</style>
