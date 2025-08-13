import jwt from 'jsonwebtoken'
import { eq, and } from "drizzle-orm"
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

    let decoded: { userId: string; email: string }
    try {
      decoded = jwt.verify(token, secret) as { userId: string; email: string }
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
    if (decoded.userId !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé'
      })
    }

    // Récupération de la date depuis les query parameters (par défaut aujourd'hui)
    const query = getQuery(event)
    const date = query.date as string || new Date().toISOString().split('T')[0]

    // Obtenir l'instance de la base de données
    const db = await useDatabase()

    // Récupérer toutes les données pour cette date
    const [caloriesData] = await db.select()
      .from(dailyCalories)
      .where(and(
        eq(dailyCalories.userId, userId),
        eq(dailyCalories.logDate, date)
      ))
      .limit(1)

    const [weightData] = await db.select()
      .from(weightLogs)
      .where(and(
        eq(weightLogs.userId, userId),
        eq(weightLogs.logDate, date)
      ))
      .limit(1)

    const [stepsData] = await db.select()
      .from(dailySteps)
      .where(and(
        eq(dailySteps.userId, userId),
        eq(dailySteps.logDate, date)
      ))
      .limit(1)

    const [workoutData] = await db.select()
      .from(workouts)
      .where(and(
        eq(workouts.userId, userId),
        eq(workouts.workoutDate, date)
      ))
      .limit(1)

    // Construire l'objet de réponse
    const response = {
      calories: caloriesData?.totalCalories || 0,
      proteins: caloriesData?.proteinsGrams || 0,
      carbs: caloriesData?.carbsGrams || 0,
      fats: caloriesData?.fatsGrams || 0,
      weight: weightData?.weightKg ? parseFloat(weightData.weightKg) : 0,
      steps: stepsData?.stepCount || 0,
      workout: !!workoutData,
      workoutName: workoutData?.workoutName || ''
    }

    return response

  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des stats quotidiennes:', error)
    
    if ((error as { statusCode?: number }).statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des statistiques quotidiennes'
    })
  }
})