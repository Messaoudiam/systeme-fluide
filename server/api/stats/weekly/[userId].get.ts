import jwt from 'jsonwebtoken'
import { eq, and, gte, sql } from "drizzle-orm"
import { useDatabase } from "~/server/utils/database"
import { dailyCalories, dailySteps, weightLogs, workouts } from "~/database/schema"

export default defineEventHandler(async (event) => {
  try {
    // Vérification de l'authentification via cookie JWT
    const token = getCookie(event, 'auth-token')
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    // Vérification du token JWT
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration serveur manquante'
      })
    }

    let decoded: { id: string; email: string }
    try {
      decoded = jwt.verify(token, secret) as { id: string; email: string }
    } catch {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide'
      })
    }

    // Récupération du paramètre userId depuis l'URL
    const userId = getRouterParam(event, 'userId')
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID utilisateur manquant'
      })
    }

    // Vérification que l'utilisateur peut accéder à ses propres données
    if (decoded.id !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé'
      })
    }

    // Date d'il y a 7 jours
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const dateLimit = sevenDaysAgo.toISOString().split('T')[0]

    // Obtenir l'instance de la base de données
    const db = await useDatabase()

    // Récupérer les moyennes des calories sur 7 jours
    const avgCalories = await db.select({
      avg: sql`COALESCE(AVG(${dailyCalories.totalCalories}), 0)::integer`
    })
      .from(dailyCalories)
      .where(and(
        eq(dailyCalories.userId, userId),
        gte(dailyCalories.logDate, dateLimit)
      ))

    // Récupérer les moyennes du poids sur 7 jours
    const avgWeight = await db.select({
      avg: sql`COALESCE(AVG(${weightLogs.weightKg}::numeric), 0)::numeric(5,1)`
    })
      .from(weightLogs)
      .where(and(
        eq(weightLogs.userId, userId),
        gte(weightLogs.logDate, dateLimit)
      ))

    // Récupérer les moyennes des pas sur 7 jours
    const avgSteps = await db.select({
      avg: sql`COALESCE(AVG(${dailySteps.stepCount}), 0)::integer`
    })
      .from(dailySteps)
      .where(and(
        eq(dailySteps.userId, userId),
        gte(dailySteps.logDate, dateLimit)
      ))

    // Compter les entraînements sur 7 jours
    const workoutCount = await db.select({
      count: sql`COUNT(*)`
    })
      .from(workouts)
      .where(and(
        eq(workouts.userId, userId),
        gte(workouts.workoutDate, dateLimit)
      ))

    // Construire l'objet de réponse
    const response = {
      calories: avgCalories[0]?.avg || 0,
      weight: parseFloat(String(avgWeight[0]?.avg || '0')),
      steps: avgSteps[0]?.avg || 0,
      workouts: parseInt(String(workoutCount[0]?.count || '0'))
    }

    return response

  } catch (error) {
    console.error('Erreur lors de la récupération des moyennes hebdomadaires:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des moyennes hebdomadaires'
    })
  }
})