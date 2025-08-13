import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Tests fonctionnels pour les utilitaires de validation
describe('Utilitaires de validation', () => {
  describe('Validation d\'email', () => {
    const emailSchema = z.string().email('Email invalide')

    it('devrait valider des emails corrects', () => {
      const validEmails = [
        'user@example.com',
        'test.email@domain.co.uk',
        'user+tag@example.org',
        'firstname.lastname@company.com'
      ]

      validEmails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(true)
      })
    })

    it('devrait rejeter des emails invalides', () => {
      const invalidEmails = [
        'not-an-email',
        '@example.com',
        'user@',
        'user.example.com',
        '',
        'user@.com'
      ]

      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Validation de mot de passe', () => {
    const passwordSchema = z
      .string()
      .min(8, 'Mot de passe trop court')
      .max(64, 'Mot de passe trop long')
      .refine(
        (password) => !['password', '123456', 'qwerty', 'admin'].includes(password.toLowerCase()),
        'Mot de passe trop commun'
      )

    it('devrait valider des mots de passe sécurisés', () => {
      const validPasswords = [
        'MonMotDePasseSecurise2024',
        'J\'aime-les-licornes-violettes',
        'Tr0ub4dor&3',
        'unBonMotDePasse123'
      ]

      validPasswords.forEach(password => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(true)
      })
    })

    it('devrait rejeter des mots de passe faibles', () => {
      const weakPasswords = [
        '123', // trop court
        'password', // trop commun
        'QWERTY', // trop commun (insensible à la casse)
        'a'.repeat(65), // trop long
        'admin' // trop commun
      ]

      weakPasswords.forEach(password => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Validation de données utilisateur', () => {
    const userSchema = z.object({
      firstName: z
        .string()
        .min(1, 'Prénom requis')
        .max(50, 'Prénom trop long')
        .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, 'Prénom invalide'),
      lastName: z
        .string()
        .min(1, 'Nom requis')
        .max(50, 'Nom trop long')
        .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, 'Nom invalide'),
      age: z
        .number()
        .int('L\'âge doit être un entier')
        .min(13, 'Vous devez avoir au moins 13 ans')
        .max(120, 'Âge invalide'),
      email: z.string().email('Email invalide')
    })

    it('devrait valider des données utilisateur complètes', () => {
      const validUsers = [
        {
          firstName: 'Jean',
          lastName: 'Dupont',
          age: 25,
          email: 'jean.dupont@example.com'
        },
        {
          firstName: 'Marie-Claire',
          lastName: 'O\'Connor',
          age: 30,
          email: 'marie.claire@test.fr'
        },
        {
          firstName: 'José',
          lastName: 'García-López',
          age: 45,
          email: 'jose@company.es'
        }
      ]

      validUsers.forEach(user => {
        const result = userSchema.safeParse(user)
        expect(result.success).toBe(true)
      })
    })

    it('devrait rejeter des données utilisateur invalides', () => {
      const invalidUsers = [
        {
          firstName: '', // prénom vide
          lastName: 'Dupont',
          age: 25,
          email: 'jean@example.com'
        },
        {
          firstName: 'Jean123', // caractères invalides
          lastName: 'Dupont',
          age: 25,
          email: 'jean@example.com'
        },
        {
          firstName: 'Jean',
          lastName: 'Dupont',
          age: 12, // trop jeune
          email: 'jean@example.com'
        },
        {
          firstName: 'Jean',
          lastName: 'Dupont',
          age: 25,
          email: 'not-an-email' // email invalide
        }
      ]

      invalidUsers.forEach(user => {
        const result = userSchema.safeParse(user)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Validation de données de fitness', () => {
    const fitnessDataSchema = z.object({
      weight: z
        .number()
        .positive('Le poids doit être positif')
        .min(20, 'Poids trop faible')
        .max(300, 'Poids trop élevé'),
      calories: z
        .number()
        .int('Les calories doivent être un entier')
        .min(0, 'Les calories ne peuvent pas être négatives')
        .max(10000, 'Nombre de calories trop élevé'),
      steps: z
        .number()
        .int('Le nombre de pas doit être un entier')
        .min(0, 'Le nombre de pas ne peut pas être négatif')
        .max(100000, 'Nombre de pas trop élevé'),
      workoutDuration: z
        .number()
        .int('La durée doit être un entier')
        .min(1, 'La durée doit être d\'au moins 1 minute')
        .max(480, 'La durée ne peut pas dépasser 8 heures')
    })

    it('devrait valider des données de fitness correctes', () => {
      const validData = [
        {
          weight: 70.5,
          calories: 2000,
          steps: 8000,
          workoutDuration: 45
        },
        {
          weight: 65,
          calories: 1800,
          steps: 12000,
          workoutDuration: 30
        }
      ]

      validData.forEach(data => {
        const result = fitnessDataSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('devrait rejeter des données de fitness invalides', () => {
      const invalidData = [
        {
          weight: -5, // poids négatif
          calories: 2000,
          steps: 8000,
          workoutDuration: 45
        },
        {
          weight: 70,
          calories: 15000, // trop de calories
          steps: 8000,
          workoutDuration: 45
        },
        {
          weight: 70,
          calories: 2000,
          steps: -1000, // pas négatifs
          workoutDuration: 45
        },
        {
          weight: 70,
          calories: 2000,
          steps: 8000,
          workoutDuration: 500 // durée trop longue
        }
      ]

      invalidData.forEach(data => {
        const result = fitnessDataSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Gestion des erreurs de validation', () => {
    const complexSchema = z.object({
      email: z.string().email('Email invalide'),
      password: z.string().min(8, 'Mot de passe trop court'),
      confirmPassword: z.string(),
      age: z.number().min(18, 'Vous devez être majeur')
    }).refine(
      (data) => data.password === data.confirmPassword,
      {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword']
      }
    )

    it('devrait fournir des messages d\'erreur détaillés', () => {
      const invalidData = {
        email: 'not-an-email',
        password: '123',
        confirmPassword: '456',
        age: 16
      }

      const result = complexSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        const errors = result.error.issues
        expect(errors.length).toBeGreaterThan(0)
        
        // Vérifier que chaque erreur a un message
        errors.forEach(error => {
          expect(error.message).toBeTruthy()
          expect(typeof error.message).toBe('string')
        })
      }
    })

    it('devrait mapper les erreurs par champ', () => {
      const invalidData = {
        email: 'invalid',
        password: 'short',
        confirmPassword: 'different',
        age: 15
      }

      const result = complexSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        const errorMap: Record<string, string> = {}
        
        result.error.issues.forEach(issue => {
          const field = issue.path.join('.')
          errorMap[field] = issue.message
        })

        expect(errorMap).toHaveProperty('email')
        expect(errorMap).toHaveProperty('password')
        expect(errorMap).toHaveProperty('age')
        expect(errorMap['email']).toBe('Email invalide')
        expect(errorMap['password']).toBe('Mot de passe trop court')
      }
    })
  })

  describe('Validation conditionnelle', () => {
    const conditionalSchema = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('basic'),
        name: z.string().min(1, 'Nom requis')
      }),
      z.object({
        type: z.literal('premium'),
        name: z.string().min(1, 'Nom requis'),
        companyName: z.string().min(1, 'Nom de l\'entreprise requis'),
        vatNumber: z.string().optional()
      })
    ])

    it('devrait valider selon le type d\'utilisateur', () => {
      const basicUser = {
        type: 'basic' as const,
        name: 'John Doe'
      }

      const premiumUser = {
        type: 'premium' as const,
        name: 'Jane Smith',
        companyName: 'Smith Corp',
        vatNumber: 'FR123456789'
      }

      expect(conditionalSchema.safeParse(basicUser).success).toBe(true)
      expect(conditionalSchema.safeParse(premiumUser).success).toBe(true)
    })

    it('devrait rejeter les données manquantes selon le type', () => {
      const invalidPremium = {
        type: 'premium' as const,
        name: 'Jane Smith'
        // companyName manquant
      }

      const result = conditionalSchema.safeParse(invalidPremium)
      expect(result.success).toBe(false)
    })
  })
})