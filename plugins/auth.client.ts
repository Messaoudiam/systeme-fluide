export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth()
  
  // Vérifier l'authentification au démarrage côté client
  if (process.client) {
    await checkAuth()
  }
})