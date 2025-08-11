<template>
  <div
    class="bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden"
  >
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"
    ></div>
    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="py-12 relative overflow-hidden">
        <!-- Floating elements -->
        <div
          class="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl animate-pulse"
        ></div>

        <div
          class="absolute bottom-20 left-1/3 w-32 h-32 bg-gradient-to-br from-error/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"
        ></div>

        <div class="max-w-5xl mx-auto px-6 text-center relative">
          <div class="inline-block mb-8">
            <h1
              class="text-4xl md:text-7xl font-light text-gradient mb-6 animate-fade-in"
            >
              Qui sommes-nous ?
            </h1>
            <div
              class="h-1 bg-gradient-to-r from-transparent via-success via-warning via-error to-transparent rounded-full animate-fade-in delay-300"
            ></div>
          </div>
        </div>
      </section>

      <!-- Qui sommes-nous Section -->
      <section class="py-12 relative animate-fade-in delay-500">
        <!-- Background pattern -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5"
        ></div>

        <div class="max-w-6xl mx-auto px-6 relative">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Lucas Gouiffes -->
            <div
              class="card p-10 text-center group hover-lift relative overflow-hidden"
            >
              <div
                class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-success/20 to-warning/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
              ></div>

              <div class="relative z-10">
                <div
                  class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 ring-4 ring-black/20 dark:ring-white/20 group-hover:ring-black/40 dark:group-hover:ring-white/40"
                >
                  <img
                    src="/gouiffes.jpg"
                    alt="Lucas Gouiffes"
                    class="w-full h-full object-cover"
                  />
                </div>

                <h3
                  class="text-3xl font-light text-black dark:text-white mb-6 group-hover:text-success transition-colors duration-300"
                >
                  Lucas Gouiffes
                </h3>

                <p
                  class="text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                >
                  Expert en transformation physique avec plus de 10 ans
                  d'expérience dans l'optimisation des performances. Spécialiste
                  en composition corporelle et méthodes d'entraînement
                  scientifiques, Lucas a accompagné des milliers de personnes
                  vers leurs objectifs physiques.
                </p>

                <!-- Réseaux sociaux Lucas -->
                <div class="flex justify-center space-x-6 mb-8">
                  <a
                    href="https://fr.esn.com/instagram/lucasg"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="Boutique ESN avec code LUCASG"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.104 4.64-1.207 1.208-2.782 1.935-4.64 2.104v-.896c1.57-.169 2.986-.896 4.048-1.958 1.062-1.062 1.789-2.478 1.958-4.048h.738zm-2.104 0c-.169 1.378-.728 2.608-1.558 3.438-.83.83-2.06 1.389-3.438 1.558v-.738c1.207-.169 2.273-.728 3.103-1.558.83-.83 1.389-1.896 1.558-3.103h.335zm-2.104 0c-.169.898-.559 1.693-1.062 2.196-.503.503-1.298.893-2.196 1.062v-.335c.728-.169 1.378-.559 1.881-1.062.503-.503.893-1.153 1.062-1.881h.315zM12 10.4c-.898 0-1.6.702-1.6 1.6s.702 1.6 1.6 1.6 1.6-.702 1.6-1.6-.702-1.6-1.6-1.6z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/lucasgouiffes/"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="Instagram de Lucas"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@LucasGouiffes"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="YouTube de Lucas"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                  </a>
                </div>

                <!-- Code promo Lucas -->
                <div class="bg-gray-100 dark:bg-gray-dark/70 backdrop-blur-sm border border-gray-200 dark:border-gray-medium/50 p-6 rounded-xl">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Codes promo exclusifs :
                  </p>
                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-between bg-gradient-to-r from-success/20 to-success/10 p-3 rounded-lg"
                    >
                      <div class="flex items-center space-x-2">
                        <span
                          class="text-black dark:text-white font-bold text-sm"
                          >ESN</span
                        >
                        <span class="text-gray-600 dark:text-gray-400">•</span>
                        <a
                          href="https://fr.esn.com/instagram/lucasg"
                          target="_blank"
                          rel="noopener"
                          class="text-black dark:text-white font-mono font-bold hover:text-success transition-colors duration-300 cursor-pointer"
                          >LUCASG</a
                        >
                      </div>
                      <button
                        class="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                        onclick="navigator.clipboard.writeText('LUCASG')"
                        title="Copier le code"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Antoine GBZ -->
            <div
              class="card p-10 text-center group hover-lift relative overflow-hidden"
            >
              <div
                class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-warning/20 to-error/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
              ></div>

              <div class="relative z-10">
                <div
                  class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 ring-4 ring-black/20 dark:ring-white/20 group-hover:ring-black/40 dark:group-hover:ring-white/40"
                >
                  <img
                    src="/gbz.jpg"
                    alt="Antoine GBZ"
                    class="w-full h-full object-cover"
                  />
                </div>

                <h3
                  class="text-3xl font-light text-black dark:text-white mb-6 group-hover:text-warning transition-colors duration-300"
                >
                  Antoine GBZ
                </h3>

                <p
                  class="text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                >
                  Passionné de fitness et expert en nutrition sportive. Antoine
                  combine une approche scientifique rigoureuse avec une
                  expérience pratique approfondie pour aider ses clients à
                  atteindre leurs objectifs de transformation physique de
                  manière durable et efficace.
                </p>

                <!-- Réseaux sociaux Antoine -->
                <div class="flex justify-center space-x-6 mb-8">
                  <a
                    href="https://fr.esn.com/instagram/gbz"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="Boutique ESN avec code GBZ"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.104 4.64-1.207 1.208-2.782 1.935-4.64 2.104v-.896c1.57-.169 2.986-.896 4.048-1.958 1.062-1.062 1.789-2.478 1.958-4.048h.738zm-2.104 0c-.169 1.378-.728 2.608-1.558 3.438-.83.83-2.06 1.389-3.438 1.558v-.738c1.207-.169 2.273-.728 3.103-1.558.83-.83 1.389-1.896 1.558-3.103h.335zm-2.104 0c-.169.898-.559 1.693-1.062 2.196-.503.503-1.298.893-2.196 1.062v-.335c.728-.169 1.378-.559 1.881-1.062.503-.503.893-1.153 1.062-1.881h.315zM12 10.4c-.898 0-1.6.702-1.6 1.6s.702 1.6 1.6 1.6 1.6-.702 1.6-1.6-.702-1.6-1.6-1.6z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/antoine_gbz/"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="Instagram d'Antoine"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@antoine_gbz"
                    target="_blank"
                    rel="noopener"
                    class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group/icon"
                    title="YouTube d'Antoine"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                  </a>
                </div>

                <!-- Codes promo Antoine -->
                <div class="bg-gray-100 dark:bg-gray-dark/70 backdrop-blur-sm border border-gray-200 dark:border-gray-medium/50 p-6 rounded-xl">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Codes promo exclusifs :
                  </p>
                  <div class="space-y-3">
                    <div
                      class="flex items-center justify-between bg-gradient-to-r from-warning/20 to-warning/10 p-3 rounded-lg"
                    >
                      <div class="flex items-center space-x-2">
                        <span
                          class="text-black dark:text-white font-bold text-sm"
                          >ESN</span
                        >
                        <span class="text-gray-600 dark:text-gray-400">•</span>
                        <a
                          href="https://fr.esn.com/instagram/gbz"
                          target="_blank"
                          rel="noopener"
                          class="text-black dark:text-white font-mono font-bold hover:text-warning transition-colors duration-300 cursor-pointer"
                          >GBZ</a
                        >
                      </div>
                      <button
                        class="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                        onclick="navigator.clipboard.writeText('GBZ')"
                        title="Copier le code"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      class="flex items-center justify-between bg-gradient-to-r from-error/20 to-error/10 p-3 rounded-lg"
                    >
                      <div class="flex items-center space-x-2">
                        <span
                          class="text-black dark:text-white font-bold text-sm"
                          >Gymshark</span
                        >
                        <span class="text-gray-600 dark:text-gray-400">•</span>
                        <span
                          class="text-black dark:text-white font-mono font-bold"
                          >GBZ10</span
                        >
                      </div>
                      <button
                        class="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                        onclick="navigator.clipboard.writeText('GBZ10')"
                        title="Copier le code"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-12 relative overflow-hidden animate-fade-in delay-700">
        <!-- Gradient background -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-black via-gray-darkest to-black dark:from-white dark:via-off-white dark:to-white"
        ></div>

        <!-- Animated background elements -->
        <div
          class="absolute top-10 left-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-10 right-1/4 w-48 h-48 bg-warning/10 rounded-full blur-3xl animate-pulse delay-1000"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-error/10 rounded-full blur-3xl animate-pulse delay-500"
        ></div>

        <div class="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2
            class="text-3xl md:text-5xl font-light text-white dark:text-black mb-8"
          >
            Suivez leur expertise au quotidien
          </h2>
          <p
            class="text-xl text-gray-light dark:text-gray-medium mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Découvrez leurs conseils, programmes et contenu exclusif sur leurs
            plateformes
          </p>

          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <NuxtLink
              to="/about"
              class="btn btn-secondary px-10 py-5 text-lg bg-white dark:bg-black text-black dark:text-white hover:bg-off-white dark:hover:bg-gray-darkest shadow-2xl relative overflow-hidden group"
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Découvrir la méthode</span>
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </NuxtLink>

            <NuxtLink
              to="/dashboard"
              class="text-white dark:text-black hover:text-gray-light dark:hover:text-gray-medium transition-colors duration-300 underline underline-offset-4 decoration-2 hover:decoration-success flex items-center space-x-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              <span>Commencer le tracking</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Équipe - Système Fluide",
  meta: [
    {
      name: "description",
      content:
        "Découvrez Lucas Gouiffes et Antoine GBZ, les créateurs du Système Fluide. Experts en transformation physique et nutrition sportive.",
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
