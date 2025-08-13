import { eq, and } from 'drizzle-orm'
import { dailyCalories } from '~/database/schema'
import { useDatabase } from '~/server/utils/database'
import { dailyCaloriesSchema } from '~/server/utils/validation/schemas'
import { validateRequestBody } from '~/server/utils/validation/validator'
import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    // Vérification de l'authentification
    const user = await verifyJWT(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    // Validation des données
    const body = await validateRequestBody(dailyCaloriesSchema)(event)

    // Vérification que l'utilisateur peut modifier ses propres données
    if (user.id !== body.userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé'
      })
    }

    const db = await useDatabase()

    // Vérifier si une entrée existe déjà pour cette date
    const existing = await db.select()
      .from(dailyCalories)
      .where(and(
        eq(dailyCalories.userId, body.userId),
        eq(dailyCalories.logDate, body.date)
      ))
      .limit(1)

    if (existing.length > 0) {
      // Mettre à jour l'entrée existante
      const updated = await db.update(dailyCalories)
        .set({
          totalCalories: body.totalCalories,
          proteinsGrams: body.proteinsGrams || null,
          carbsGrams: body.carbsGrams || null,
          fatsGrams: body.fatsGrams || null,
          mealDetails: body.mealDetails || null,
          notes: body.notes || null,
          updatedAt: new Date()
        })
        .where(and(
          eq(dailyCalories.userId, body.userId),
          eq(dailyCalories.logDate, body.date)
        ))
        .returning()

      return {
        success: true,
        message: 'Calories mises à jour avec succès',
        data: updated[0]
      }
    } else {
      // Créer une nouvelle entrée
      const created = await db.insert(dailyCalories)
        .values({
          userId: body.userId,
          logDate: body.date,
          totalCalories: body.totalCalories,
          proteinsGrams: body.proteinsGrams || null,
          carbsGrams: body.carbsGrams || null,
          fatsGrams: body.fatsGrams || null,
          mealDetails: body.mealDetails || null,
          notes: body.notes || null
        })
        .returning()

      return {
        success: true,
        message: 'Calories enregistrées avec succès',
        data: created[0]
      }
    }

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des calories:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'enregistrement des calories'
    })
  }
})