import { z } from 'zod'
import { userIdSchema, weightSchema, stepCountSchema, caloriesSchema } from './schemas'

/**
 * Schémas de validation spécifiques pour les données quotidiennes
 * Alignés avec la structure de la base de données et les besoins du frontend
 */

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)')
  .refine((date) => {
    const parsed = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - parsed.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 365 // Maximum 1 an dans le passé ou le futur
  }, 'Date trop éloignée de la date actuelle')

// Schéma pour les macronutriments
export const macronutrientSchema = z
  .number()
  .int('Les macronutriments doivent être des nombres entiers')
  .min(0, 'Les macronutriments ne peuvent pas être négatifs')
  .max(1000, 'Valeur de macronutriment irréaliste')

// Schéma pour les entraînements
export const workoutNameSchema = z
  .string()
  .trim()
  .min(1, 'Le nom de l\'entraînement ne peut pas être vide')
  .max(100, 'Le nom de l\'entraînement ne peut pas dépasser 100 caractères')
  .optional()

// Schéma principal pour les données quotidiennes
export const dailyDataSchema = z.object({
  userId: userIdSchema,
  date: dateSchema.optional(), // Optionnel, par défaut = aujourd'hui
  
  // Données nutritionnelles
  calories: caloriesSchema.optional(),
  proteins: macronutrientSchema.optional(),
  carbs: macronutrientSchema.optional(), 
  fats: macronutrientSchema.optional(),
  
  // Données physiques
  weight: weightSchema.optional(),
  steps: stepCountSchema.optional(),
  
  // Données d'entraînement
  workout: z.boolean().optional(),
  workoutName: workoutNameSchema
}).refine((data) => {
  // Si workout est true, au moins vérifier qu'il y a un nom
  if (data.workout === true) {
    return data.workoutName && data.workoutName.length > 0
  }
  return true
}, {
  message: 'Un nom d\'entraînement est requis quand un entraînement est marqué',
  path: ['workoutName']
})

// Schéma pour la récupération des stats quotidiennes
export const dailyStatsQuerySchema = z.object({
  date: dateSchema.optional()
})

// Types TypeScript dérivés
export type DailyDataInput = z.infer<typeof dailyDataSchema>
export type DailyStatsQuery = z.infer<typeof dailyStatsQuerySchema>

// Utilitaire pour valider et nettoyer les données
export function validateDailyData(data: unknown): DailyDataInput {
  return dailyDataSchema.parse(data)
}

// Utilitaire pour transformer les données frontend vers DB
export function transformToDbFormat(data: DailyDataInput) {
  return {
    userId: data.userId,
    logDate: data.date || new Date().toISOString().split('T')[0],
    totalCalories: data.calories,
    proteinsGrams: data.proteins,
    carbsGrams: data.carbs,
    fatsGrams: data.fats,
    weightKg: data.weight?.toString(), // DB stocke en string
    stepCount: data.steps, // DB utilise stepCount
    workout: data.workout,
    workoutName: data.workoutName
  }
}