import { db } from '~/database'
import { users, workouts } from '~/database/schema'
import { count, eq } from 'drizzle-orm'
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

    // Statistiques des utilisateurs totaux
    const totalUsersQuery = await db.select({ count: count() }).from(users)
    const totalUsers = totalUsersQuery[0]?.count || 0

    // Statistiques des administrateurs
    const totalAdminsQuery = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, 'admin'))
    const totalAdmins = totalAdminsQuery[0]?.count || 0

    // Utilisateurs actifs aujourd'hui (qui ont fait des workouts aujourd'hui)
    const today = new Date().toISOString().split('T')[0]
    const activeTodayQuery = await db
      .selectDistinct({ userId: workouts.userId })
      .from(workouts)
      .where(eq(workouts.workoutDate, today))
    const activeToday = activeTodayQuery.length

    return {
      totalUsers,
      totalAdmins,
      activeToday
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques admin:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de la récupération des statistiques'
    })
  }
})