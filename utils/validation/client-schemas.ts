import { z } from 'zod'

// Schémas de base pour la validation côté client
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

// Schémas pour les formulaires client
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Mot de passe requis')
})

export const registerFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirmation du mot de passe requise'),
  firstName: nameSchema,
  lastName: nameSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})

export const profileFormSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)')
    .refine((date) => {
      if (!date) return true
      const parsed = new Date(date)
      const now = new Date()
      const age = now.getFullYear() - parsed.getFullYear()
      return age >= 13 && age <= 120
    }, 'L\'âge doit être entre 13 et 120 ans')
    .optional(),
  gender: z
    .enum(['M', 'F', 'Autre'], {
      message: 'Le genre doit être "M", "F" ou "Autre"'
    })
    .optional(),
  heightCm: z
    .number()
    .int('La taille doit être un nombre entier')
    .min(100, 'La taille minimum est de 100 cm')
    .max(250, 'La taille maximum est de 250 cm')
    .optional(),
  targetWeightKg: z
    .number()
    .min(20, 'Le poids minimum est de 20 kg')
    .max(300, 'Le poids maximum est de 300 kg')
    .optional(),
  targetStepsPerDay: z
    .number()
    .int('Le nombre de pas doit être un nombre entier')
    .min(0, 'Le nombre de pas ne peut pas être négatif')
    .max(100000, 'Nombre de pas irréaliste')
    .optional(),
  targetCaloriesPerDay: z
    .number()
    .min(0, 'Les calories ne peuvent pas être négatives')
    .max(10000, 'Nombre de calories irréaliste')
    .optional()
})

export const weightLogFormSchema = z.object({
  weightKg: z
    .number()
    .min(20, 'Le poids minimum est de 20 kg')
    .max(300, 'Le poids maximum est de 300 kg'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide'),
  notes: z
    .string()
    .max(500, 'Les notes ne peuvent pas dépasser 500 caractères')
    .trim()
    .optional()
})

export const dailyStepsFormSchema = z.object({
  steps: z
    .number()
    .int('Le nombre de pas doit être un nombre entier')
    .min(0, 'Le nombre de pas ne peut pas être négatif')
    .max(100000, 'Nombre de pas irréaliste'),
  distanceKm: z
    .number()
    .min(0, 'La distance ne peut pas être négative')
    .max(200, 'Distance irréaliste')
    .optional(),
  caloriesBurned: z
    .number()
    .min(0, 'Les calories ne peuvent pas être négatives')
    .max(10000, 'Nombre de calories irréaliste')
    .optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
})

export const dailyCaloriesFormSchema = z.object({
  caloriesConsumed: z
    .number()
    .min(0, 'Les calories ne peuvent pas être négatives')
    .max(10000, 'Nombre de calories irréaliste'),
  mealDetails: z
    .string()
    .max(1000, 'Détails du repas trop longs')
    .optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
})

export const tdeeCalculatorSchema = z.object({
  age: z
    .number()
    .int('L\'âge doit être un nombre entier')
    .min(13, 'Âge minimum 13 ans')
    .max(120, 'Âge maximum 120 ans'),
  gender: z.enum(['M', 'F'], {
    message: 'Sélectionnez votre sexe'
  }),
  weight: z
    .number()
    .min(20, 'Poids minimum 20 kg')
    .max(300, 'Poids maximum 300 kg'),
  height: z
    .number()
    .int('La taille doit être un nombre entier')
    .min(100, 'Taille minimum 100 cm')
    .max(250, 'Taille maximum 250 cm'),
  activityLevel: z.enum(['sedentaire', 'leger', 'modere', 'intense', 'extreme'], {
    message: 'Sélectionnez votre niveau d\'activité'
  })
})

// Types TypeScript pour le côté client
export type LoginFormData = z.infer<typeof loginFormSchema>
export type RegisterFormData = z.infer<typeof registerFormSchema>
export type ProfileFormData = z.infer<typeof profileFormSchema>
export type WeightLogFormData = z.infer<typeof weightLogFormSchema>
export type DailyStepsFormData = z.infer<typeof dailyStepsFormSchema>
export type DailyCaloriesFormData = z.infer<typeof dailyCaloriesFormSchema>
export type TdeeCalculatorData = z.infer<typeof tdeeCalculatorSchema>