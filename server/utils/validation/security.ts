import { z } from 'zod'

/**
 * Schémas de validation pour la sécurité et les données sensibles
 */

// Validation stricte des mots de passe
export const securePasswordSchema = z
  .string()
  .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
  .max(128, 'Le mot de passe est trop long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
  .refine((password) => {
    // Vérification des mots de passe couramment utilisés
    const commonPasswords = [
      'password123', 'Password123!', '123456789', 'qwertyuiop',
      'azerty123', 'motdepasse', 'Motdepasse1!', 'admin123'
    ]
    return !commonPasswords.includes(password)
  }, 'Ce mot de passe est trop courant')

// Validation stricte des emails
export const secureEmailSchema = z
  .string()
  .email('Format d\'email invalide')
  .min(1, 'Email requis')
  .max(254, 'Email trop long')
  .toLowerCase()
  .trim()
  .refine((email) => {
    // Vérifier les domaines temporaires/suspects
    const suspiciousDomains = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com']
    const domain = email.split('@')[1]
    return !suspiciousDomains.includes(domain)
  }, 'Ce domaine email n\'est pas autorisé')

// Validation des noms avec protection contre l'injection
export const secureNameSchema = z
  .string()
  .min(1, 'Ce champ est requis')
  .max(50, 'Maximum 50 caractères')
  .trim()
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Seules les lettres, espaces, apostrophes et traits d\'union sont autorisés')
  .refine((name) => {
    // Détecter les tentatives d'injection HTML/Script
    const htmlPattern = /<[^>]*>/
    const scriptPattern = /javascript:|data:|vbscript:/i
    return !htmlPattern.test(name) && !scriptPattern.test(name)
  }, 'Caractères interdits détectés')

// Validation des notes/commentaires avec nettoyage XSS
export const secureNotesSchema = z
  .string()
  .max(1000, 'Les notes ne peuvent pas dépasser 1000 caractères')
  .trim()
  .optional()
  .refine((notes) => {
    if (!notes) return true
    
    // Détecter les tentatives XSS
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /on\w+\s*=/gi,
      /javascript:/gi,
      /data:text\/html/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>/gi
    ]
    
    return !xssPatterns.some(pattern => pattern.test(notes))
  }, 'Contenu non autorisé détecté')

// Validation des données numériques avec limites strictes
export const secureWeightSchema = z
  .number()
  .finite('Le poids doit être un nombre valide')
  .min(20, 'Le poids minimum est de 20 kg')
  .max(300, 'Le poids maximum est de 300 kg')
  .refine((weight) => {
    // Vérifier que le poids est raisonnable (pas de valeurs extrêmes)
    return weight >= 30 && weight <= 250 // Plage plus restrictive pour la sécurité
  }, 'Poids en dehors de la plage acceptée')

export const secureStepsSchema = z
  .number()
  .int('Le nombre de pas doit être un nombre entier')
  .finite('Le nombre de pas doit être un nombre valide')
  .min(0, 'Le nombre de pas ne peut pas être négatif')
  .max(50000, 'Nombre de pas maximum dépassé') // Limite plus stricte
  .refine((steps) => {
    // Vérifier que c'est un nombre raisonnable
    return steps <= 30000 // Limite quotidienne raisonnable
  }, 'Nombre de pas irréaliste')

export const secureCaloriesSchema = z
  .number()
  .finite('Les calories doivent être un nombre valide')
  .min(0, 'Les calories ne peuvent pas être négatives')
  .max(5000, 'Nombre de calories maximum dépassé') // Limite plus restrictive
  .refine((calories) => {
    return calories <= 4000 // Limite quotidienne raisonnable
  }, 'Nombre de calories irréaliste')

/**
 * Utilitaires de validation de sécurité
 */

/**
 * Nettoie une chaîne de caractères des caractères dangereux
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .trim()
}

/**
 * Valide qu'une date est dans une plage raisonnable
 */
export function validateDateRange(date: string, maxYearsBack = 150, maxYearsForward = 1): boolean {
  const parsedDate = new Date(date)
  const now = new Date()
  const minDate = new Date(now.getFullYear() - maxYearsBack, 0, 1)
  const maxDate = new Date(now.getFullYear() + maxYearsForward, 11, 31)
  
  return parsedDate >= minDate && parsedDate <= maxDate
}

/**
 * Valide qu'un UUID est au bon format
 */
export const uuidSchema = z
  .string()
  .uuid('Format d\'identifiant invalide')
  .refine((uuid) => {
    // Vérification supplémentaire du format UUID v4
    const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidV4Pattern.test(uuid)
  }, 'Format d\'identifiant invalide')

/**
 * Schémas de validation sécurisés pour l'API
 */
export const secureLoginSchema = z.object({
  email: secureEmailSchema,
  password: z.string().min(1, 'Mot de passe requis').max(128, 'Mot de passe trop long')
})

export const secureRegisterSchema = z.object({
  email: secureEmailSchema,
  password: securePasswordSchema,
  firstName: secureNameSchema,
  lastName: secureNameSchema,
  role: z.enum(['admin', 'user'], { message: 'Le rôle doit être "admin" ou "user"' }).optional()
})

export const secureWeightLogSchema = z.object({
  userId: uuidSchema,
  weightKg: secureWeightSchema,
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
    .refine((date) => validateDateRange(date, 50, 0), 'Date en dehors de la plage acceptée'),
  notes: secureNotesSchema
})

export const secureDailyStepsSchema = z.object({
  userId: uuidSchema,
  steps: secureStepsSchema,
  distanceMeters: z.number().min(0).max(100000).optional(), // 100km max
  caloriesBurned: secureCaloriesSchema.optional(),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
    .refine((date) => validateDateRange(date, 5, 0), 'Date en dehors de la plage acceptée')
})

export const secureDailyCaloriesSchema = z.object({
  userId: uuidSchema,
  caloriesConsumed: secureCaloriesSchema,
  mealDetails: secureNotesSchema,
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide')
    .refine((date) => validateDateRange(date, 5, 0), 'Date en dehors de la plage acceptée')
})

// Types TypeScript pour la sécurité
export type SecureLoginData = z.infer<typeof secureLoginSchema>
export type SecureRegisterData = z.infer<typeof secureRegisterSchema>
export type SecureWeightLogData = z.infer<typeof secureWeightLogSchema>
export type SecureDailyStepsData = z.infer<typeof secureDailyStepsSchema>
export type SecureDailyCaloriesData = z.infer<typeof secureDailyCaloriesSchema>