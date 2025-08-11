<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-off-white to-white dark:from-gray-darkest dark:via-gray-dark dark:to-gray-darkest transition-all duration-500 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
    <div class="relative z-10">
    <!-- Hero Section -->
    <section class="py-24 relative overflow-hidden">
      <!-- Floating elements -->
      <div class="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-32 right-1/3 w-60 h-60 bg-gradient-to-br from-warning/10 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>
      <div class="absolute bottom-20 left-1/3 w-32 h-32 bg-gradient-to-br from-error/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div class="max-w-5xl mx-auto px-6 text-center relative">
        <div class="inline-block mb-8">
          <h1 class="text-4xl md:text-7xl font-light text-gradient mb-6 animate-fade-in">
            À propos du Système Fluide
          </h1>
          <div class="h-1 bg-gradient-to-r from-transparent via-success via-warning via-error to-transparent rounded-full animate-fade-in delay-300"></div>
        </div>
        
        <p class="text-xl md:text-2xl text-gray-medium dark:text-gray-light max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500">
          Un mode d'emploi pratique pour maîtriser sa nutrition, son entraînement et optimiser votre environnement de progression
        </p>
        
        <!-- Mission statement highlight -->
        <div class="mt-12 glass-strong p-8 rounded-2xl max-w-2xl mx-auto animate-fade-in delay-700">
          <div class="flex items-center justify-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-success to-warning rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-light text-black dark:text-white mb-4">Rendre l'excellence accessible à tous</h2>
          <p class="text-gray-medium dark:text-gray-light">Un système de progression infini basé sur la science</p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-24 relative">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">Notre Mission</h2>
              <div class="w-20 h-1 bg-gradient-to-r from-success to-warning rounded-full mb-8"></div>
            </div>
            
            <div class="space-y-6">
              <div class="card p-6 hover-lift">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-success to-success/70 rounded-lg flex items-center justify-center mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-black dark:text-white mb-2">Excellence accessible</h3>
                    <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                      Rendre l'excellence physique accessible à tous, peu importe votre niveau ou contexte de vie.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="card p-6 hover-lift">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-warning to-warning/70 rounded-lg flex items-center justify-center mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-black dark:text-white mb-2">Cartographie complète</h3>
                    <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                      Une cartographie complète de l'excellence physique pour une transformation parfaite et automatique.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="card p-6 hover-lift">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-error to-error/70 rounded-lg flex items-center justify-center mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-black dark:text-white mb-2">Basé sur la science</h3>
                    <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                      Nourri par les recherches scientifiques récentes et des dizaines d'années d'expérience coaching.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-metric p-10 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-darkest/90 to-black/90 dark:from-white/90 dark:via-off-white/90 dark:to-white/90"></div>
            <div class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-success/20 to-warning/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            
            <div class="relative z-10">
              <div class="flex items-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-success to-warning rounded-2xl flex items-center justify-center mr-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-3xl font-light text-white dark:text-black">L'objectif</h3>
              </div>
              
              <p class="text-lg text-gray-light dark:text-gray-medium leading-relaxed mb-6">
                Vous rendre totalement <strong class="text-white dark:text-black">autonome</strong> et ne plus jamais dépendre de programmes figés ou de directives externes.
              </p>
              
              <div class="glass p-4 rounded-xl">
                <p class="text-white dark:text-black font-medium">
                  <span class="text-success">→</span> Clarté absolue sur les prochaines étapes à appliquer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Public Cible Section -->
    <section class="py-24 relative">
      <!-- Background pattern -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-off-white/30 to-transparent dark:via-gray-dark/30"></div>
      
      <div class="max-w-6xl mx-auto px-6 relative">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">
            Pour Qui ?
          </h2>
          <p class="text-xl text-gray-medium dark:text-gray-light max-w-4xl mx-auto leading-relaxed">
            Toute personne (âge, sexe, niveau) désirant savoir exactement quoi faire pour avancer vers leur esthétique physique idéal
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card-metric p-8 text-center group cursor-pointer">
            <div class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-success transition-colors duration-300">Débutants</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              La feuille de route complète pour progresser à vie, tout en évitant les erreurs classiques. Vous gagnez des années de tâtonnements.
            </p>
            <div class="mt-6 flex justify-center">
            </div>
          </div>

          <div class="card-metric p-8 text-center group cursor-pointer">
            <div class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-warning transition-colors duration-300">Expérimentés</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Des directions claires et un système de progression illimité. Débloquez enfin votre progression et maintenez vos résultats durablement.
            </p>
            <div class="mt-6 flex justify-center">
            </div>
          </div>

          <div class="card-metric p-8 text-center group cursor-pointer">
            <div class="w-20 h-20 bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-error transition-colors duration-300">Coachs</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Un système complet pour délivrer plus de valeur à vos élèves avec une méthodologie scientifique éprouvée.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophie Section -->
    <section class="py-24 relative">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5"></div>
      
      <div class="max-w-6xl mx-auto px-6 relative">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">
            Principes Fondamentaux
          </h2>
          <div class="w-32 h-1 bg-gradient-to-r from-success via-warning to-error rounded-full mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="card p-8 text-left group hover-lift">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-medium text-black dark:text-white mb-4 group-hover:text-success transition-colors duration-300">Autonomie totale</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Pas de programmes figés. Le système s'adapte toujours en fonction de votre contexte de vie et les contraintes sont prises en compte à tous les niveaux.
            </p>
          </div>

          <div class="card p-8 text-left group hover-lift">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-medium text-black dark:text-white mb-4 group-hover:text-warning transition-colors duration-300">Progression infinie</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Un système de progression illimité et adaptable qui évolue avec vous, que vous ayez peu ou beaucoup de temps pour la musculation.
            </p>
          </div>

          <div class="card p-8 text-left group hover-lift">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-medium text-black dark:text-white mb-4 group-hover:text-error transition-colors duration-300">Clarté absolue</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Vous saurez toujours exactement quoi faire pour progresser. Fini les tâtonnements et les programmes inadaptés.
            </p>
          </div>

          <div class="card p-8 text-left group hover-lift">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-medium text-black dark:text-white mb-4 group-hover:text-gray-medium transition-colors duration-300">Basé sur la science</h3>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Méthodologie nourrie par les recherches scientifiques récentes et des dizaines d'années d'expérience de coaching terrain.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Podcast Section -->
    <section class="py-24 relative overflow-hidden">
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-success/5 via-warning/5 to-error/5 dark:from-success/10 dark:via-warning/10 dark:to-error/10"></div>
      
      <!-- Floating elements -->
      <div class="absolute top-10 right-1/4 w-48 h-48 bg-gradient-to-br from-success/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 left-1/3 w-32 h-32 bg-gradient-to-br from-warning/20 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div class="max-w-6xl mx-auto px-6 relative">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">
            Podcasts Référence
          </h2>
          <div class="w-32 h-1 bg-gradient-to-r from-success via-warning to-error rounded-full mx-auto mb-8"></div>
          <p class="text-xl text-gray-medium dark:text-gray-light max-w-4xl mx-auto leading-relaxed">
            Plongez dans l'univers du <strong class="text-gradient">Système Fluide</strong>
            avec les podcasts <strong class="text-black dark:text-white">NRJTRO & TOXICITY</strong>
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <!-- Podcast Info -->
          <div class="space-y-8">
            <!-- Platform Links -->
            <div class="space-y-4">
              <h4 class="text-lg font-medium text-black dark:text-white text-center mb-6">Écoutez sur vos plateformes préférées</h4>
              
              <!-- Spotify -->
              <div class="flex justify-center">
                <a 
                  href="https://open.spotify.com/show/0x4XQr2Jn3N0dHjMjBFSG7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-primary px-8 py-4 text-lg relative overflow-hidden group"
                >
                  <span class="relative z-10 flex items-center space-x-3">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1 -.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.1-.9 7.7-.5 10.6 1.2.3.2.4.7.2 1zm1.3-2.9c-.3.4-.8.5-1.2.2-2.8-1.7-7.1-2.2-10.4-1.2-.5.1-1-.2-1.1-.7-.1-.5.2-1 .7-1.1 3.8-1.1 8.5-.6 11.8 1.4.4.2.5.8.2 1.2zm.1-3c-3.4-2-9-2.2-12.2-1.2-.6.2-1.2-.2-1.4-.8-.2-.6.2-1.2.8-1.4 3.7-1.1 10.1-.9 14 1.4.5.3.7 1 .4 1.5-.3.5-1 .7-1.5.4z"/>
                    </svg>
                    <span>Écouter sur Spotify</span>
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>
              
              <!-- YouTube Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <!-- NRJTRO -->
                <a 
                  href="https://www.youtube.com/playlist?list=PLMWmRNk3IkgsqnJJawBToepeU-3SU44u6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="card p-6 hover-lift group"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="text-lg font-medium text-black dark:text-white group-hover:text-success transition-colors duration-300">NRJTRO</h5>
                      <p class="text-sm text-gray-medium dark:text-gray-light">Conversations intimes & vraies</p>
                      <p class="text-xs text-gray-medium dark:text-gray-light mt-1">Transformation personnelle</p>
                    </div>
                  </div>
                </a>
                
                <!-- Toxicity -->
                <a 
                  href="https://www.youtube.com/playlist?list=PLMWmRNk3IkgtbSd1n1rrbQKl3KAlLQHpY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="card p-6 hover-lift group"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-medium to-gray-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="text-lg font-medium text-black dark:text-white group-hover:text-error transition-colors duration-300">TOXICITY</h5>
                      <p class="text-sm text-gray-medium dark:text-gray-light">Critique moderne du fitness</p>
                      <p class="text-xs text-gray-medium dark:text-gray-light mt-1">Philosophie & méthodes</p>
                    </div>
                  </div>
                </a>
              </div>
              
              <p class="text-center text-sm text-gray-medium dark:text-gray-light mt-4">
                Choisissez votre format : audio sur Spotify ou vidéo sur YouTube
              </p>
            </div>
          </div>
        </div>
        
        <!-- Connection to Pyramids -->
        <div class="mt-16 text-center">
          <div class="glass-strong p-8 rounded-2xl max-w-2xl mx-auto">
            <h4 class="text-xl font-medium text-black dark:text-white mb-4">
              🎯 Connexion avec le Système Fluide
            </h4>
            <p class="text-gray-medium dark:text-gray-light leading-relaxed">
              Lucas Gouiffes a démocratisé les 
              <NuxtLink to="/pyramides-helms" class="text-gradient font-medium hover:underline">
                pyramides de Helms
              </NuxtLink>
              dans le monde francophone, concepts fondamentaux intégrés dans notre application 
              pour vous guider vers l'excellence physique.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 relative">
      <!-- Background pattern -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-off-white/30 to-transparent dark:via-gray-dark/30"></div>
      
      <div class="max-w-4xl mx-auto px-6 relative">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-light text-gradient mb-8">
            Questions Fréquentes
          </h2>
          <p class="text-xl text-gray-medium dark:text-gray-light">Les réponses à vos interrogations</p>
        </div>

        <div class="space-y-6">
          <div class="card p-8 hover-lift group">
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-gradient-to-br from-success to-success/70 rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-success transition-colors duration-300">
                  Est-ce que le Système fonctionne pour les femmes comme pour les hommes ?
                </h3>
                <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                  Oui, le système s'applique peu importe le sexe, l'âge de la personne. La mécanique reste la même pour contrôler sa composition corporelle et prendre du muscle.
                </p>
              </div>
            </div>
          </div>

          <div class="card p-8 hover-lift group">
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-gradient-to-br from-warning to-warning/70 rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-warning transition-colors duration-300">
                  J'ai beaucoup de poids à perdre, est-ce que le Système fonctionne pour moi ?
                </h3>
                <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                  Oui, le système fonctionne quel que soit le point de départ, la mécanique reste la même. Le tracking quotidien vous permettra de suivre votre progression étape par étape.
                </p>
              </div>
            </div>
          </div>

          <div class="card p-8 hover-lift group">
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-gradient-to-br from-error to-error/70 rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-error transition-colors duration-300">
                  Je me sens maigre, est-ce que le Système va m'apporter une aide pour le muscle ?
                </h3>
                <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                  Absolument. Même si la gestion de la composition corporelle est un pilier du système, il en va de même pour la prise de muscle. Vous apprendrez à sculpter votre physique exactement comme vous le souhaitez, avec une progression continue.
                </p>
              </div>
            </div>
          </div>

          <div class="card p-8 hover-lift group">
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-gradient-to-br from-black to-gray-darkest dark:from-white dark:to-off-white rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-medium text-black dark:text-white mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  Je fais des sports à côté de la musculation, est-ce adapté ?
                </h3>
                <p class="text-gray-medium dark:text-gray-light leading-relaxed">
                  Totalement, vous adaptez toujours votre système à votre contexte de vie et pas l'inverse. Beaucoup d'utilisateurs pratiquent d'autres sports (MMA, football, escalade...).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-r from-black via-gray-darkest to-black dark:from-white dark:via-off-white dark:to-white"></div>
      
      <!-- Animated background elements -->
      <div class="absolute top-10 left-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-1/4 w-48 h-48 bg-warning/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-error/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div class="max-w-4xl mx-auto text-center px-6 relative z-10">
        <h2 class="text-3xl md:text-5xl font-light text-white dark:text-black mb-8">
          Prêt à commencer votre transformation ?
        </h2>
        <p class="text-xl text-gray-light dark:text-gray-medium mb-12 leading-relaxed max-w-2xl mx-auto">
          Trackez vos métriques essentielles et prenez le contrôle de votre progression physique avec le Système Fluide
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <NuxtLink to="/dashboard" class="btn btn-secondary px-10 py-5 text-lg bg-white dark:bg-black text-black dark:text-white hover:bg-off-white dark:hover:bg-gray-darkest shadow-2xl relative overflow-hidden group">
            <span class="relative z-10 flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Accéder au Dashboard</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-success/20 to-warning/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </NuxtLink>
          
          <NuxtLink to="/" class="text-white dark:text-black hover:text-gray-light dark:hover:text-gray-medium transition-colors duration-300 underline underline-offset-4 decoration-2 hover:decoration-success flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Retour Accueil</span>
          </NuxtLink>
        </div>
        
        <!-- Trust indicators -->
      </div>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'À propos - Système Fluide',
  meta: [
    { name: 'description', content: 'Découvrez la philosophie du Système Fluide : rendre l\'excellence physique accessible à tous grâce à un système de progression infini basé sur la science' }
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