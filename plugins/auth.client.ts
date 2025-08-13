export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth();

  // Vérifier l'authentification au démarrage côté client
  if (import.meta.client) {
    await checkAuth();
  }
});
