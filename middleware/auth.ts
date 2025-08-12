export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, checkAuth } = useAuth();

  // Toujours vérifier l'authentification en appelant l'API
  try {
    const user = await checkAuth();

    if (!user) {
      // Rediriger vers la page de connexion avec la route de retour
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } catch (error) {
    console.error("Erreur vérification authentification:", error);
    // En cas d'erreur, rediriger vers la page de connexion
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});
