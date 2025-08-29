<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"
    />
    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <!-- Floating elements -->
        <div
          class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 rounded-full blur-3xl animate-pulse"
        />
        <div
          class="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"
        />

        <div class="max-w-7xl mx-auto px-6 py-24 relative">
          <div class="text-center">
            <div class="inline-block">
              <img
                :src="$colorMode.value === 'dark' ? '/ban.png' : '/systeme_fluide_inverted.png'"
                alt="Système Fluide"
                class="mx-auto mb-6 animate-fade-in max-h-20 md:max-h-28"
              >
              <div
                class="h-1 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent rounded-full mb-8 animate-fade-in delay-300"
              />
            </div>

            <p
              class="text-xl md:text-2xl text-gray-medium dark:text-gray-light mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500"
            >
              Rendre l'excellence physique accessible à tous grâce à un système
              de progression infini
            </p>

            <div
              class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in delay-700"
            >
              <PatreonButton size="lg" variant="primary" />
              <NuxtLink to="/about" class="btn btn-outline px-10 py-5 text-lg">
                En savoir plus
              </NuxtLink>
            </div>

            <!-- Stats preview -->
            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in delay-1000"
            >
              <div class="text-center">
                <div
                  class="text-2xl md:text-3xl font-light text-black dark:text-white mb-1"
                >
                  10K+
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  Utilisateurs
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl md:text-3xl font-light text-black dark:text-white mb-1"
                >
                  4
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  Métriques
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl md:text-3xl font-light text-black dark:text-white mb-1"
                >
                  ∞
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  Progression
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl md:text-3xl font-light text-black dark:text-white mb-1"
                >
                  100%
                </div>
                <div class="text-sm text-gray-medium dark:text-gray-light">
                  Autonomie
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 relative">
        <!-- Background pattern -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-off-white/30 to-transparent dark:via-gray-dark/30"
        />

        <div class="max-w-7xl mx-auto px-6 relative">
          <div class="text-center mb-20">
            <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">
              Un système simple et efficace
            </h2>
            <p
              class="text-xl text-gray-medium dark:text-gray-light max-w-3xl mx-auto leading-relaxed"
            >
              Trackez vos 4 métriques essentielles quotidiennement pour une
              progression continue et mesurable
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Calories -->
            <div class="card-metric p-8 text-center group cursor-pointer">
              <div
                class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-black dark:text-white"
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
              <h3
                class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              >
                Calories & Macros
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Suivez vos calories totales et macronutriments (protéines,
                glucides, lipides)
              </p>
            </div>

            <!-- Poids -->
            <div class="card-metric p-8 text-center group cursor-pointer">
              <div
                class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-black dark:text-white"
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
              <h3
                class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              >
                Poids corporel
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Enregistrez votre poids quotidiennement pour suivre l'évolution
              </p>
            </div>

            <!-- Pas -->
            <div class="card-metric p-8 text-center group cursor-pointer">
              <div
                class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-black dark:text-white"
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
              <h3
                class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              >
                Pas quotidiens
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Comptez vos pas pour maintenir un niveau d'activité optimal
              </p>
            </div>

            <!-- Entraînement -->
            <div class="card-metric p-8 text-center group cursor-pointer">
              <div
                class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-black dark:text-white"
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
              <h3
                class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              >
                Entraînements
              </h3>
              <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                Notez vos séances d'entraînement pour une progression continue
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Philosophie Section -->
      <section class="py-24 relative">
        <!-- Gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5"
        />

        <div class="max-w-7xl mx-auto px-6 relative">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl md:text-5xl font-light text-gradient mb-12">
              Votre autonomie totale
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div class="card p-8 text-left group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-black dark:text-white mb-4">
                  Système de progression infini
                </h3>
                <p
                  class="text-gray-medium dark:text-gray-light leading-relaxed"
                >
                  Pas de programmes figés. Un système adaptable qui évolue avec
                  vous et votre contexte de vie.
                </p>
              </div>

              <div class="card p-8 text-left group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-black dark:text-white mb-4">
                  Clarté absolue
                </h3>
                <p
                  class="text-gray-medium dark:text-gray-light leading-relaxed"
                >
                  Sachez exactement quoi faire chaque jour pour progresser vers
                  votre esthétique physique idéal.
                </p>
              </div>

              <div class="card p-8 text-left group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-black dark:text-white mb-4">
                  Basé sur la science
                </h3>
                <p
                  class="text-gray-medium dark:text-gray-light leading-relaxed"
                >
                  Nourri par les recherches scientifiques récentes et des
                  dizaines d'années d'expérience de coaching.
                </p>
              </div>

              <div class="card p-8 text-left group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-black dark:text-white mb-4">
                  Pour tous les niveaux
                </h3>
                <p
                  class="text-gray-medium dark:text-gray-light leading-relaxed"
                >
                  Que vous soyez débutant ou expérimenté, le système s'adapte à
                  votre niveau et vos objectifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 relative overflow-hidden">
        <!-- Gradient background -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-black via-gray-darkest to-black dark:from-white dark:via-off-white dark:to-white"
        />

        <!-- Animated background elements -->
        <div
          class="absolute top-10 left-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse"
        />
        <div
          class="absolute bottom-10 right-1/4 w-48 h-48 bg-warning/10 rounded-full blur-3xl animate-pulse delay-1000"
        />

        <div class="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2
            class="text-3xl md:text-5xl font-light text-white dark:text-black mb-8"
          >
            Commencez votre transformation aujourd'hui
          </h2>
          <p
            class="text-xl text-gray-light dark:text-gray-medium mb-12 leading-relaxed"
          >
            Rejoignez les milliers d'utilisateurs qui ont pris le contrôle de
            leur progression physique
          </p>

          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <NuxtLink
              to="/dashboard"
              class="btn btn-secondary px-10 py-5 text-lg bg-white dark:bg-black text-black dark:text-white hover:bg-off-white dark:hover:bg-gray-darkest shadow-2xl relative overflow-hidden group"
            >
              <span class="relative z-10">Accéder au dashboard</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="text-white dark:text-black hover:text-gray-light dark:hover:text-gray-medium transition-colors duration-300 underline underline-offset-4 decoration-2 hover:decoration-success"
            >
              Découvrir la méthode →
            </NuxtLink>
          </div>

          <!-- Social proof -->
          <div
            class="mt-16 flex justify-center items-center space-x-8 opacity-60"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Système Fluide - Excellence physique accessible à tous",
  meta: [
    {
      name: "description",
      content:
        "Application de tracking fitness basée sur un système de progression infini. Suivez calories, poids, pas et entraînements pour une transformation physique optimale.",
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

.delay-1000 {
  animation-delay: 1s;
}
</style>
