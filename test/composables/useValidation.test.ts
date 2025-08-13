import { describe, it, expect, beforeEach } from 'vitest'
import { z } from 'zod'
import { useValidation } from '~/composables/useValidation'

describe('useValidation', () => {
  const { validate, validateField, createFormValidation, extractApiErrors } = useValidation()
  
  // Schéma de test simple
  const testSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    age: z.number().min(18, 'Vous devez avoir au moins 18 ans')
  })

  describe('validate', () => {
    it('devrait valider des données correctes', () => {
      const validData = {
        email: 'test@example.com',
        password: 'motdepasse123',
        age: 25
      }

      const result = validate(testSchema, validData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(validData)
      expect(result.errors).toEqual({})
      expect(result.firstError).toBeUndefined()
    })

    it('devrait retourner des erreurs pour des données invalides', () => {
      const invalidData = {
        email: 'email-invalide',
        password: '123',
        age: 16
      }

      const result = validate(testSchema, invalidData)

      expect(result.success).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.errors).toMatchObject({
        email: 'Email invalide',
        password: 'Le mot de passe doit contenir au moins 6 caractères',
        age: 'Vous devez avoir au moins 18 ans'
      })
      expect(result.firstError).toBe('Email invalide')
    })

    it('devrait gérer les erreurs de schéma complexes', () => {
      const result = validate(testSchema, {})

      expect(result.success).toBe(false)
      expect(Object.keys(result.errors || {})).toHaveLength(3)
    })
  })

  describe('validateField', () => {
    it('devrait valider un champ correct', () => {
      const result = validateField(testSchema, 'email', 'test@example.com')

      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('devrait invalider un champ incorrect', () => {
      const result = validateField(testSchema, 'email', 'email-invalide')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Email invalide')
    })

    it('devrait valider avec des données partielles', () => {
      const existingData = { age: 25 }
      const result = validateField(testSchema, 'email', 'test@example.com', existingData)

      expect(result.isValid).toBe(true)
    })
  })

  describe('createFormValidation', () => {
    let formValidation: ReturnType<typeof createFormValidation>

    beforeEach(() => {
      formValidation = createFormValidation(testSchema)
    })

    it('devrait initialiser avec un état vide', () => {
      expect(formValidation.state.errors).toEqual({})
      expect(formValidation.state.isValid).toBe(false)
      expect(formValidation.state.hasErrors).toBe(false)
      expect(formValidation.state.touched).toEqual({})
    })

    it('devrait valider un formulaire complet', () => {
      const validData = {
        email: 'test@example.com',
        password: 'motdepasse123',
        age: 25
      }

      const isValid = formValidation.validateForm(validData)

      expect(isValid).toBe(true)
      expect(formValidation.state.isValid).toBe(true)
      expect(formValidation.state.hasErrors).toBe(false)
      expect(formValidation.state.errors).toEqual({})
    })

    it('devrait valider un champ individuel', () => {
      const isValid = formValidation.validateSingleField('email', 'test@example.com')

      expect(isValid).toBe(true)
      expect(formValidation.state.touched.email).toBe(true)
      expect(formValidation.state.errors.email).toBeUndefined()
    })

    it('devrait marquer un champ comme touché', () => {
      formValidation.touchField('email')

      expect(formValidation.state.touched.email).toBe(true)
    })

    it('devrait obtenir l\'erreur d\'un champ', () => {
      formValidation.validateSingleField('email', 'email-invalide')

      expect(formValidation.getFieldError('email')).toBe('Email invalide')
    })

    it('devrait vérifier si un champ est touché', () => {
      expect(formValidation.isFieldTouched('email')).toBe(false)
      
      formValidation.touchField('email')
      
      expect(formValidation.isFieldTouched('email')).toBe(true)
    })

    it('devrait déterminer si une erreur de champ doit être affichée', () => {
      expect(formValidation.shouldShowFieldError('email')).toBe(false)
      
      formValidation.validateSingleField('email', 'email-invalide')
      
      expect(formValidation.shouldShowFieldError('email')).toBe(true)
    })

    it('devrait réinitialiser la validation', () => {
      // D'abord invalider quelque chose
      formValidation.validateSingleField('email', 'email-invalide')
      
      // Puis réinitialiser
      formValidation.resetValidation()

      expect(formValidation.state.errors).toEqual({})
      expect(formValidation.state.isValid).toBe(false)
      expect(formValidation.state.hasErrors).toBe(false)
      expect(formValidation.state.touched).toEqual({})
    })
  })

  describe('extractApiErrors', () => {
    it('devrait extraire les erreurs d\'un tableau d\'erreurs API', () => {
      const apiError = {
        data: {
          errors: [
            { field: 'email', message: 'Email déjà utilisé' },
            { field: 'password', message: 'Mot de passe trop faible' }
          ]
        }
      }

      const result = extractApiErrors(apiError)

      expect(result).toEqual({
        email: 'Email déjà utilisé',
        password: 'Mot de passe trop faible'
      })
    })

    it('devrait extraire une erreur unique d\'API', () => {
      const apiError = {
        data: {
          field: 'email',
          message: 'Email déjà utilisé'
        }
      }

      const result = extractApiErrors(apiError)

      expect(result).toEqual({
        email: 'Email déjà utilisé'
      })
    })

    it('devrait retourner un objet vide pour des erreurs invalides', () => {
      const result = extractApiErrors({})

      expect(result).toEqual({})
    })

    it('devrait ignorer les erreurs sans champ ou message', () => {
      const apiError = {
        data: {
          errors: [
            { field: 'email' }, // pas de message
            { message: 'Erreur générique' }, // pas de champ
            { field: 'password', message: 'Mot de passe requis' } // valide
          ]
        }
      }

      const result = extractApiErrors(apiError)

      expect(result).toEqual({
        password: 'Mot de passe requis'
      })
    })
  })
})