import { db } from '~/database'
import { users } from '~/database/schema'
import { extractTokenFromRequest, verifyToken } from '~/server/utils/jwt'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Vérification de l'authentification admin
    const token = extractTokenFromRequest(event)
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token d\'authentification manquant'
      })
    }

    const payload = verifyToken(token)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide ou expiré'
      })
    }

    if (payload.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès interdit - Droits administrateur requis'
      })
    }

    // Récupération des données depuis le body
    const body = await readBody(event)
    
    if (!body || !body.userId || !body.role) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userId et role requis dans la requête'
      })
    }

    const { userId, role } = body
    
    // Vérifier que userId est une string non vide (UUID)
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID utilisateur invalide'
      })
    }

    if (role !== 'user' && role !== 'admin') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Rôle invalide. Doit être "user" ou "admin"'
      })
    }

    // Vérification que l'utilisateur existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (existingUser.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Utilisateur non trouvé'
      })
    }

    // Empêcher un admin de se retirer ses propres droits admin
    if (payload.userId === userId && role === 'user') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Impossible de retirer vos propres droits administrateur'
      })
    }

    // Mise à jour du rôle
    await db
      .update(users)
      .set({ 
        role: role,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))

    return {
      success: true,
      message: `Rôle mis à jour avec succès vers "${role === 'admin' ? 'administrateur' : 'utilisateur'}"`
    }

  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de la mise à jour du rôle'
    })
  }
})