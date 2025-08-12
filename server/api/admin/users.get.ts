import { db } from '~/database'
import { users } from '~/database/schema'
import { extractTokenFromRequest, verifyToken } from '~/server/utils/jwt'

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

    // Récupération de tous les utilisateurs (sans les mots de passe)
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        birthDate: users.birthDate,
        gender: users.gender,
        heightCm: users.heightCm,
        targetWeightKg: users.targetWeightKg,
        targetStepsPerDay: users.targetStepsPerDay,
        targetCaloriesPerDay: users.targetCaloriesPerDay,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      })
      .from(users)
      .orderBy(users.createdAt)

    return allUsers
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de la récupération des utilisateurs'
    })
  }
})