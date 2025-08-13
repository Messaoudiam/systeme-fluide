import { z } from 'zod'

// Schémas de base pour les types primitifs
export const emailSchema = z
  .string()
  .email('Format d\'email invalide')
  .min(1, 'Email requis')
  .max(254, 'Email trop long')
  .toLowerCase()
  .trim()

export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .max(128, 'Le mot de passe est trop long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 
    'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre')

export const nameSchema = z
  .string()
  .min(1, 'Ce champ est requis')
  .max(50, 'Maximum 50 caractères')
  .trim()
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Seules les lettres, espaces, apostrophes et traits d\'union sont autorisés')

export const roleSchema = z.enum(['admin', 'user'], {
  message: 'Le rôle doit être "admin" ou "user"'
})

// Schémas pour les données utilisateur
export const userIdSchema = z
  .string()
  .uuid('ID utilisateur invalide')

export const birthDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)')
  .refine((date) => {
    const parsed = new Date(date)
    const now = new Date()
    const age = now.getFullYear() - parsed.getFullYear()
    return age >= 13 && age <= 120
  }, 'L\'âge doit être entre 13 et 120 ans')
  .optional()

export const genderSchema = z
  .enum(['male', 'female', 'other'], {
    message: 'Le genre doit être "male", "female" ou "other"'
  })
  .optional()

// Schéma pour la compatibilité avec l'ancien format
export const legacyGenderSchema = z
  .enum(['M', 'F', 'Autre'], {
    message: 'Le genre doit être "M", "F" ou "Autre"'
  })
  .optional()
  .transform((val) => {
    if (val === 'M') return 'male'
    if (val === 'F') return 'female'
    if (val === 'Autre') return 'other'
    return val
  })

export const heightSchema = z
  .number()
  .int('La taille doit être un nombre entier')
  .min(100, 'La taille minimum est de 100 cm')
  .max(250, 'La taille maximum est de 250 cm')
  .optional()

export const weightSchema = z
  .number()
  .min(20, 'Le poids minimum est de 20 kg')
  .max(300, 'Le poids maximum est de 300 kg')
  .multipleOf(0.1, 'Le poids doit avoir au maximum 1 décimale')

export const stepsSchema = z
  .number()
  .int('Le nombre de pas doit être un nombre entier')
  .min(0, 'Le nombre de pas ne peut pas être négatif')
  .max(100000, 'Nombre de pas irréaliste')

export const caloriesSchema = z
  .number()
  .min(0, 'Les calories ne peuvent pas être négatives')
  .max(10000, 'Nombre de calories irréaliste')

export const notesSchema = z
  .string()
  .max(500, 'Les notes ne peuvent pas dépasser 500 caractères')
  .trim()
  .optional()

// Schémas d'authentification
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Mot de passe requis')
})

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: roleSchema.optional()
})

// Schémas pour les données de tracking
export const weightLogSchema = z.object({
  userId: userIdSchema,
  weightKg: weightSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide'),
  notes: notesSchema
})

// Schéma pour les steps aligné avec la DB (stepCount)
export const stepCountSchema = z
  .number()
  .int('Le nombre de pas doit être un nombre entier')
  .min(0, 'Le nombre de pas ne peut pas être négatif')
  .max(100000, 'Nombre de pas irréaliste')

export const dailyStepsSchema = z.object({
  userId: userIdSchema,
  stepCount: stepCountSchema, // Aligné avec la DB
  distanceMeters: z.number().min(0).max(200000).optional(), // Distance en mètres pour correspondre au DB schema
  caloriesBurned: caloriesSchema.optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
})

export const dailyCaloriesSchema = z.object({
  userId: userIdSchema,
  totalCalories: caloriesSchema, // Aligné avec la DB
  proteinsGrams: z.number().int().min(0).max(1000).optional(), // Aligné avec la DB
  carbsGrams: z.number().int().min(0).max(1000).optional(), // Aligné avec la DB  
  fatsGrams: z.number().int().min(0).max(1000).optional(), // Aligné avec la DB
  mealDetails: z.string().max(1000, 'Détails du repas trop longs').optional(),
  notes: notesSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
})

export const userProfileUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  birthDate: birthDateSchema,
  gender: genderSchema,
  heightCm: heightSchema,
  targetWeightKg: weightSchema.optional(),
  targetStepsPerDay: stepsSchema.optional(),
  targetCaloriesPerDay: caloriesSchema.optional()
})

// Schémas pour l'administration
export const updateUserRoleSchema = z.object({
  userId: userIdSchema,
  role: roleSchema
})

export const userSearchSchema = z.object({
  search: z.string().trim().optional(),
  role: roleSchema.optional(),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0)
})

// Schéma pour les entraînements
export const workoutSchema = z.object({
  userId: userIdSchema,
  workoutName: z.string().trim().min(1).max(100).optional(),
  workoutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide'),
  durationMinutes: z.number().int().min(1).max(600).optional(), // 10h max
  trainingType: z.string().trim().max(50).optional(),
  notes: notesSchema
})

// Types TypeScript dérivés des schémas
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type WeightLogData = z.infer<typeof weightLogSchema>
export type DailyStepsData = z.infer<typeof dailyStepsSchema>
export type DailyCaloriesData = z.infer<typeof dailyCaloriesSchema>
export type UserProfileUpdateData = z.infer<typeof userProfileUpdateSchema>
export type UpdateUserRoleData = z.infer<typeof updateUserRoleSchema>
export type UserSearchData = z.infer<typeof userSearchSchema>