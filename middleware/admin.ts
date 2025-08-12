export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuth } = useAuth()
  
  // Vérifier l'authentification et les permissions admin
  try {
    const user = await checkAuth()
    
    if (!user) {
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé - Privilèges administrateur requis'
      })
    }
  } catch (error) {
    if (error.statusCode === 403) {
      throw error // Re-lancer les erreurs 403
    }
    
    console.error('Erreur vérification authentification admin:', error)
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})