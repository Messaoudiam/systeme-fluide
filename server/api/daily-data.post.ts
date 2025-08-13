import jwt from 'jsonwebtoken'
import { eq, and } from "drizzle-orm"
import { useDatabase } from "~/server/utils/database"
import { dailyCalories, dailySteps, weightLogs, workouts } from "~/database/schema"

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Méthode non autorisée'
    })
  }

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

    // Récupération des données du corps de la requête
    const body = await readBody(event)
    const { userId, date, calories, proteins, carbs, fats, weight, steps, workout, workoutName } = body

    // Vérification que l'utilisateur peut modifier ses propres données
    if (decoded.userId !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé'
      })
    }

    const targetDate = date || new Date().toISOString().split('T')[0] // Format YYYY-MM-DD

    // Obtenir l'instance de la base de données
    const db = await useDatabase()

    // Transaction pour sauvegarder toutes les données
    const results: unknown[] = []

    // Sauvegarder les calories si fournies
    if (calories !== undefined && calories !== null) {
      // Vérifier si une entrée existe déjà pour aujourd'hui
      const existingCalories = await db.select()
        .from(dailyCalories)
        .where(and(
          eq(dailyCalories.userId, userId),
          eq(dailyCalories.logDate, targetDate)
        ))
        .limit(1)

      if (existingCalories.length > 0) {
        // Mettre à jour l'entrée existante
        await db.update(dailyCalories)
          .set({ 
            totalCalories: calories,
            proteinsGrams: proteins,
            carbsGrams: carbs,
            fatsGrams: fats,
            mealDetails: `Protéines: ${proteins || 0}g, Glucides: ${carbs || 0}g, Lipides: ${fats || 0}g`,
            updatedAt: new Date()
          })
          .where(and(
            eq(dailyCalories.userId, userId),
            eq(dailyCalories.logDate, targetDate)
          ))
      } else {
        // Créer une nouvelle entrée
        await db.insert(dailyCalories).values({
          userId,
          logDate: targetDate,
          totalCalories: calories,
          proteinsGrams: proteins,
          carbsGrams: carbs,
          fatsGrams: fats,
          mealDetails: `Protéines: ${proteins || 0}g, Glucides: ${carbs || 0}g, Lipides: ${fats || 0}g`
        })
      }
      results.push({ type: 'calories', success: true })
    }

    // Sauvegarder le poids si fourni
    if (weight !== undefined && weight !== null) {
      const existingWeight = await db.select()
        .from(weightLogs)
        .where(and(
          eq(weightLogs.userId, userId),
          eq(weightLogs.logDate, targetDate)
        ))
        .limit(1)

      if (existingWeight.length > 0) {
        await db.update(weightLogs)
          .set({ 
            weightKg: weight.toString(),
            updatedAt: new Date()
          })
          .where(and(
            eq(weightLogs.userId, userId),
            eq(weightLogs.logDate, targetDate)
          ))
      } else {
        await db.insert(weightLogs).values({
          userId,
          logDate: targetDate,
          weightKg: weight.toString()
        })
      }
      results.push({ type: 'weight', success: true })
    }

    // Sauvegarder les pas si fournis
    if (steps !== undefined && steps !== null) {
      const existingSteps = await db.select()
        .from(dailySteps)
        .where(and(
          eq(dailySteps.userId, userId),
          eq(dailySteps.logDate, targetDate)
        ))
        .limit(1)

      if (existingSteps.length > 0) {
        await db.update(dailySteps)
          .set({ 
            stepCount: steps,
            updatedAt: new Date()
          })
          .where(and(
            eq(dailySteps.userId, userId),
            eq(dailySteps.logDate, targetDate)
          ))
      } else {
        await db.insert(dailySteps).values({
          userId,
          logDate: targetDate,
          stepCount: steps
        })
      }
      results.push({ type: 'steps', success: true })
    }

    // Sauvegarder l'entraînement si fourni
    if (workout !== undefined) {
      const existingWorkout = await db.select()
        .from(workouts)
        .where(and(
          eq(workouts.userId, userId),
          eq(workouts.workoutDate, targetDate)
        ))
        .limit(1)

      if (workout === true) {
        if (existingWorkout.length > 0) {
          await db.update(workouts)
            .set({ 
              workoutName: workoutName || 'Entraînement',
              updatedAt: new Date()
            })
            .where(and(
              eq(workouts.userId, userId),
              eq(workouts.workoutDate, targetDate)
            ))
        } else {
          await db.insert(workouts).values({
            userId,
            workoutDate: targetDate,
            workoutName: workoutName || 'Entraînement'
          })
        }
        results.push({ type: 'workout', success: true })
      } else if (workout === false && existingWorkout.length > 0) {
        // Supprimer l'entraînement si décoché
        await db.delete(workouts)
          .where(and(
            eq(workouts.userId, userId),
            eq(workouts.workoutDate, targetDate)
          ))
        results.push({ type: 'workout', success: true, deleted: true })
      }
    }

    return {
      success: true,
      message: 'Données sauvegardées avec succès',
      saved: results
    }

  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données quotidiennes:', error)
    
    if ((error as { statusCode?: number }).statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la sauvegarde des données'
    })
  }
})