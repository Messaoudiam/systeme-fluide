import { extractTokenFromRequest, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractTokenFromRequest(event)
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token d\'authentification manquant'
    })
  }

  try {
    // Vérifier et décoder le token JWT
    const payload = verifyToken(token)
    
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide ou expiré'
      })
    }
    
    return {
      user: {
        id: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role
      }
    }
  } catch (error) {
    console.error('Erreur de vérification token:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 401,
      statusMessage: 'Token invalide ou expiré'
    })
  }
})