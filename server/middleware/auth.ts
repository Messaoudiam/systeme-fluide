import { extractTokenFromRequest, verifyToken } from '~/server/utils/jwt'

/**
 * Middleware serveur pour vérifier l'authentification JWT
 * S'applique aux routes protégées côté serveur
 */
export default defineEventHandler(async (event) => {
  // Appliquer uniquement aux routes API nécessitant une authentification
  const protectedApiRoutes = [
    '/api/user',
    '/api/dashboard',
    '/api/admin'
  ]

  const url = getRouterParam(event, 'url') || event.node.req.url || ''
  
  // Vérifier si la route nécessite une authentification
  const requiresAuth = protectedApiRoutes.some(route => url.startsWith(route))
  
  if (!requiresAuth) {
    return // Continuer sans vérification
  }

  const token = extractTokenFromRequest(event)
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token d\'authentification requis'
    })
  }

  const payload = verifyToken(token)
  
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token invalide ou expiré'
    })
  }

  // Ajouter l'utilisateur au contexte de la requête
  event.context.user = {
    id: payload.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    role: payload.role
  }
})