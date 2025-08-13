import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createError } from 'h3'

// Mock des utilitaires
const mockUseDatabase = vi.fn()
const mockVerifyPassword = vi.fn()
const mockGenerateToken = vi.fn()
const mockSetJWTCookie = vi.fn()
const mockCheckRateLimit = vi.fn()
const mockRecordLoginAttempt = vi.fn()
const mockGetClientIP = vi.fn()
const mockFormatTimeRemaining = vi.fn()
const mockValidateRequestBody = vi.fn()

// Mock des modules
vi.mock('~/server/utils/database', () => ({
  useDatabase: mockUseDatabase
}))

vi.mock('~/server/utils/password', () => ({
  verifyPassword: mockVerifyPassword
}))

vi.mock('~/server/utils/jwt', () => ({
  generateToken: mockGenerateToken,
  setJWTCookie: mockSetJWTCookie
}))

vi.mock('~/server/utils/rate-limiter', () => ({
  checkRateLimit: mockCheckRateLimit,
  recordLoginAttempt: mockRecordLoginAttempt,
  getClientIP: mockGetClientIP,
  formatTimeRemaining: mockFormatTimeRemaining
}))

vi.mock('~/server/utils/validation/validator', () => ({
  validateRequestBody: mockValidateRequestBody
}))

vi.mock('~/server/utils/validation/schemas', () => ({
  loginSchema: {}
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn()
}))

vi.mock('~/database/schema', () => ({
  users: {
    email: 'users.email'
  }
}))

// Import du handler après les mocks
const loginHandler = await import('~/server/api/auth/login.post')

describe('Login API', () => {
  const mockEvent = {
    node: {
      req: {
        headers: {
          'x-forwarded-for': '192.168.1.1'
        }
      }
    }
  } as any

  const mockUser = {
    id: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: '$2b$12$hashedPassword',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockAuthUser = {
    id: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user' as const
  }

  const mockLoginData = {
    email: 'test@example.com',
    password: 'password123'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Configuration par défaut des mocks
    mockValidateRequestBody.mockReturnValue(() => mockLoginData)
    mockGetClientIP.mockReturnValue('192.168.1.1')
    mockCheckRateLimit.mockReturnValue({ allowed: true })
    mockUseDatabase.mockResolvedValue({
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockUser])
          })
        })
      })
    })
    mockVerifyPassword.mockResolvedValue(true)
    mockGenerateToken.mockReturnValue('jwt-token')
  })

  describe('Connexion réussie', () => {
    it('devrait connecter un utilisateur avec des identifiants valides', async () => {
      const result = await loginHandler.default(mockEvent)

      expect(mockValidateRequestBody).toHaveBeenCalled()
      expect(mockGetClientIP).toHaveBeenCalledWith(mockEvent)
      expect(mockCheckRateLimit).toHaveBeenCalledWith('192.168.1.1', mockLoginData.email)
      expect(mockVerifyPassword).toHaveBeenCalledWith(mockLoginData.password, mockUser.password)
      expect(mockGenerateToken).toHaveBeenCalledWith(mockAuthUser)
      expect(mockSetJWTCookie).toHaveBeenCalledWith(mockEvent, 'jwt-token')
      expect(mockRecordLoginAttempt).toHaveBeenCalledWith('192.168.1.1', mockLoginData.email, true)

      expect(result).toEqual({
        user: mockAuthUser,
        token: 'jwt-token'
      })
    })

    it('devrait gérer un utilisateur admin', async () => {
      const adminUser = { ...mockUser, role: 'admin' }
      const adminAuthUser = { ...mockAuthUser, role: 'admin' as const }
      
      mockUseDatabase.mockResolvedValue({
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([adminUser])
            })
          })
        })
      })

      const result = await loginHandler.default(mockEvent)

      expect(mockGenerateToken).toHaveBeenCalledWith(adminAuthUser)
      expect(result.user.role).toBe('admin')
    })
  })

  describe('Rate limiting', () => {
    it('devrait bloquer les connexions en cas de rate limiting', async () => {
      mockCheckRateLimit.mockReturnValue({
        allowed: false,
        blockedUntil: Date.now() + 300000 // 5 minutes
      })
      mockFormatTimeRemaining.mockReturnValue('5 minutes')

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 429,
        statusMessage: 'Trop de tentatives de connexion. Réessayez dans 5 minutes.'
      })

      // Vérifier qu'aucune autre opération n'a été effectuée
      expect(mockUseDatabase).not.toHaveBeenCalled()
      expect(mockVerifyPassword).not.toHaveBeenCalled()
    })

    it('devrait gérer le cas où blockedUntil n\'est pas défini', async () => {
      mockCheckRateLimit.mockReturnValue({
        allowed: false,
        blockedUntil: null
      })

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 429,
        statusMessage: 'Trop de tentatives de connexion. Réessayez dans quelques minutes.'
      })
    })
  })

  describe('Erreurs d\'authentification', () => {
    it('devrait rejeter un email inexistant', async () => {
      mockUseDatabase.mockResolvedValue({
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([]) // Aucun utilisateur trouvé
            })
          })
        })
      })

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })

      expect(mockRecordLoginAttempt).toHaveBeenCalledWith('192.168.1.1', mockLoginData.email, false)
      expect(mockVerifyPassword).not.toHaveBeenCalled()
      expect(mockGenerateToken).not.toHaveBeenCalled()
    })

    it('devrait rejeter un mot de passe incorrect', async () => {
      mockVerifyPassword.mockResolvedValue(false)

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })

      expect(mockRecordLoginAttempt).toHaveBeenCalledWith('192.168.1.1', mockLoginData.email, false)
      expect(mockGenerateToken).not.toHaveBeenCalled()
      expect(mockSetJWTCookie).not.toHaveBeenCalled()
    })
  })

  describe('Gestion des erreurs serveur', () => {
    it('devrait gérer les erreurs de base de données', async () => {
      mockUseDatabase.mockRejectedValue(new Error('Database connection failed'))

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 500,
        statusMessage: 'Erreur serveur lors de la connexion'
      })
    })

    it('devrait propager les erreurs HTTP existantes', async () => {
      const httpError = createError({
        statusCode: 400,
        statusMessage: 'Bad Request'
      })
      mockUseDatabase.mockRejectedValue(httpError)

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 400,
        statusMessage: 'Bad Request'
      })
    })

    it('devrait gérer les erreurs de vérification de mot de passe', async () => {
      mockVerifyPassword.mockRejectedValue(new Error('Password verification failed'))

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 500,
        statusMessage: 'Erreur serveur lors de la connexion'
      })
    })

    it('devrait gérer les erreurs de génération de token', async () => {
      mockGenerateToken.mockImplementation(() => {
        throw new Error('Token generation failed')
      })

      await expect(loginHandler.default(mockEvent)).rejects.toMatchObject({
        statusCode: 500,
        statusMessage: 'Erreur serveur lors de la connexion'
      })
    })
  })

  describe('Flux complet', () => {
    it('devrait effectuer toutes les étapes dans le bon ordre pour une connexion réussie', async () => {
      const result = await loginHandler.default(mockEvent)

      // Vérifier l'ordre des appels
      const callOrder = []
      
      if (mockValidateRequestBody.mock.calls.length > 0) callOrder.push('validate')
      if (mockGetClientIP.mock.calls.length > 0) callOrder.push('getIP')
      if (mockCheckRateLimit.mock.calls.length > 0) callOrder.push('rateLimit')
      if (mockUseDatabase.mock.calls.length > 0) callOrder.push('database')
      if (mockVerifyPassword.mock.calls.length > 0) callOrder.push('verifyPassword')
      if (mockGenerateToken.mock.calls.length > 0) callOrder.push('generateToken')
      if (mockSetJWTCookie.mock.calls.length > 0) callOrder.push('setCookie')
      
      expect(callOrder).toEqual([
        'validate',
        'getIP', 
        'rateLimit',
        'database',
        'verifyPassword',
        'generateToken',
        'setCookie'
      ])

      expect(result).toEqual({
        user: mockAuthUser,
        token: 'jwt-token'
      })
    })

    it('devrait enregistrer les tentatives de connexion pour les succès et échecs', async () => {
      // Test d'un succès
      await loginHandler.default(mockEvent)
      expect(mockRecordLoginAttempt).toHaveBeenLastCalledWith('192.168.1.1', mockLoginData.email, true)

      // Reset les mocks
      vi.clearAllMocks()
      mockValidateRequestBody.mockReturnValue(() => mockLoginData)
      mockGetClientIP.mockReturnValue('192.168.1.1')
      mockCheckRateLimit.mockReturnValue({ allowed: true })
      
      // Test d'un échec
      mockVerifyPassword.mockResolvedValue(false)
      mockUseDatabase.mockResolvedValue({
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([mockUser])
            })
          })
        })
      })

      try {
        await loginHandler.default(mockEvent)
      } catch (error) {
        // Expected error
      }

      expect(mockRecordLoginAttempt).toHaveBeenCalledWith('192.168.1.1', mockLoginData.email, false)
    })
  })
})