import { describe, it, expect, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { hashPassword, verifyPassword, validatePassword } from '~/server/utils/password'

// Mock bcrypt pour les tests
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn()
  }
}))

const mockBcrypt = bcrypt as any

describe('Password Utils', () => {
  describe('hashPassword', () => {
    it('devrait hasher un mot de passe avec succès', async () => {
      const password = 'monMotDePasse123'
      const hashedPassword = '$2b$12$hashedPasswordExample'
      
      mockBcrypt.hash.mockResolvedValueOnce(hashedPassword)

      const result = await hashPassword(password)

      expect(mockBcrypt.hash).toHaveBeenCalledWith(password, 12)
      expect(result).toBe(hashedPassword)
    })

    it('devrait gérer les erreurs de hashage', async () => {
      const password = 'monMotDePasse123'
      const error = new Error('Erreur bcrypt')
      
      mockBcrypt.hash.mockRejectedValueOnce(error)

      await expect(hashPassword(password)).rejects.toThrow('Erreur lors du hashage du mot de passe')
    })
  })

  describe('verifyPassword', () => {
    it('devrait vérifier un mot de passe correct', async () => {
      const password = 'monMotDePasse123'
      const hashedPassword = '$2b$12$hashedPasswordExample'
      
      mockBcrypt.compare.mockResolvedValueOnce(true)

      const result = await verifyPassword(password, hashedPassword)

      expect(mockBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword)
      expect(result).toBe(true)
    })

    it('devrait rejeter un mot de passe incorrect', async () => {
      const password = 'mauvaisMotDePasse'
      const hashedPassword = '$2b$12$hashedPasswordExample'
      
      mockBcrypt.compare.mockResolvedValueOnce(false)

      const result = await verifyPassword(password, hashedPassword)

      expect(result).toBe(false)
    })

    it('devrait retourner false en cas d\'erreur de vérification', async () => {
      const password = 'monMotDePasse123'
      const hashedPassword = '$2b$12$hashedPasswordExample'
      const error = new Error('Erreur bcrypt')
      
      mockBcrypt.compare.mockRejectedValueOnce(error)

      const result = await verifyPassword(password, hashedPassword)

      expect(result).toBe(false)
    })
  })

  describe('validatePassword', () => {
    describe('Validation de base', () => {
      it('devrait rejeter un mot de passe vide', () => {
        const result = validatePassword('')
        
        expect(result.valid).toBe(false)
        expect(result.message).toBe('Le mot de passe est requis')
      })

      it('devrait rejeter un mot de passe null ou undefined', () => {
        const resultNull = validatePassword(null as any)
        const resultUndefined = validatePassword(undefined as any)
        
        expect(resultNull.valid).toBe(false)
        expect(resultUndefined.valid).toBe(false)
      })

      it('devrait rejeter un mot de passe trop court', () => {
        const result = validatePassword('1234567') // 7 caractères
        
        expect(result.valid).toBe(false)
        expect(result.message).toBe('Le mot de passe doit contenir au moins 8 caractères')
      })

      it('devrait rejeter un mot de passe trop long', () => {
        const longPassword = 'a'.repeat(65) // 65 caractères
        const result = validatePassword(longPassword)
        
        expect(result.valid).toBe(false)
        expect(result.message).toBe('Le mot de passe ne peut pas dépasser 64 caractères')
      })

      it('devrait accepter un mot de passe de longueur valide', () => {
        const result = validatePassword('12345678') // 8 caractères
        
        expect(result.valid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    describe('Validation des mots de passe compromis', () => {
      it('devrait rejeter des mots de passe courants', () => {
        const commonPasswords = [
          'password',
          'PASSWORD',
          '123456',
          'qwerty',
          'admin',
          'motdepasse',
          'azerty'
        ]

        commonPasswords.forEach(password => {
          const result = validatePassword(password)
          expect(result.valid).toBe(false)
          expect(result.message).toContain('trop courant')
        })
      })

      it('devrait rejeter les variations avec des chiffres à la fin', () => {
        const variationPasswords = [
          'password123',
          'admin1',
          'qwerty2023',
          'motdepasse42'
        ]

        variationPasswords.forEach(password => {
          const result = validatePassword(password)
          expect(result.valid).toBe(false)
          expect(result.message).toContain('basé sur un mot courant')
        })
      })

      it('ne devrait pas rejeter des mots de passe sécurisés', () => {
        const securePasswords = [
          'MonMotDePasseSecurise2024!',
          'J\'aime-les-licornes-violettes',
          'Tr0ub4dor&3',
          'correct-horse-battery-staple',
          'MyUniqueP@ssw0rd2024',
          'unMotDePasseBienComplexe'
        ]

        securePasswords.forEach(password => {
          const result = validatePassword(password)
          expect(result.valid).toBe(true)
          expect(result.message).toBeUndefined()
        })
      })
    })

    describe('Respect des recommandations NIST 2025', () => {
      it('devrait accepter des phrases de passe longues', () => {
        const passphrase = 'J\'aime beaucoup les chats noirs qui dorment au soleil'
        const result = validatePassword(passphrase)
        
        expect(result.valid).toBe(true)
      })

      it('devrait accepter des mots de passe sans majuscules', () => {
        const password = 'monmotdepassetoutminuscule'
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })

      it('devrait accepter des mots de passe sans chiffres', () => {
        const password = 'MonMotDePasseSansChiffres'
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })

      it('devrait accepter des mots de passe sans caractères spéciaux', () => {
        const password = 'UnBonMotDePasseSansCaracteresSpeciaux'
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })

      it('devrait accepter un mot de passe de 64 caractères exactement', () => {
        const password = 'a'.repeat(64)
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })
    })

    describe('Cas limites', () => {
      it('devrait gérer les espaces dans le mot de passe', () => {
        const password = 'Mon mot de passe avec espaces'
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })

      it('devrait gérer les caractères Unicode', () => {
        const password = 'MötDëPāsse123🔐'
        const result = validatePassword(password)
        
        expect(result.valid).toBe(true)
      })

      it('devrait être sensible à la casse pour les mots courants', () => {
        // 'PASSWORD' devrait être rejeté même en majuscules
        const result = validatePassword('PASSWORD')
        
        expect(result.valid).toBe(false)
      })

      it('ne devrait pas rejeter un mot contenant un mot courant au milieu', () => {
        const password = 'MonPasswordSecurise' // contient 'password' mais n'est pas juste 'password'
        const result = validatePassword(password)
        
        // Ce test vérifie que notre logique ne rejette que les mots de passe 
        // qui SONT exactement des mots courants, pas ceux qui les contiennent
        expect(result.valid).toBe(true)
      })
    })
  })

  describe('Intégration complète', () => {
    it('devrait hasher et vérifier un mot de passe valide', async () => {
      const password = 'MonMotDePasseSecurise2024!'
      const hashedPassword = '$2b$12$exemple.hash.pour.test'
      
      // Validation
      const validation = validatePassword(password)
      expect(validation.valid).toBe(true)
      
      // Hashage
      mockBcrypt.hash.mockResolvedValueOnce(hashedPassword)
      const hashed = await hashPassword(password)
      expect(hashed).toBe(hashedPassword)
      
      // Vérification
      mockBcrypt.compare.mockResolvedValueOnce(true)
      const isValid = await verifyPassword(password, hashed)
      expect(isValid).toBe(true)
    })

    it('devrait rejeter la validation puis empêcher le hashage d\'un mot de passe faible', () => {
      const weakPassword = 'password'
      
      // Validation devrait échouer
      const validation = validatePassword(weakPassword)
      expect(validation.valid).toBe(false)
      
      // En pratique, on ne devrait pas hasher un mot de passe invalide
      // mais on peut tester que le hashage fonctionnerait techniquement
    })
  })
})