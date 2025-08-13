import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { AuthUser } from '~/types/auth'
import { 
  generateToken, 
  verifyToken, 
  extractTokenFromRequest, 
  setJWTCookie, 
  clearJWTCookie, 
  verifyJWT 
} from '~/server/utils/jwt'

// Mock des fonctions H3
const mockGetCookie = vi.fn()
const mockSetCookie = vi.fn()
const mockDeleteCookie = vi.fn()
const mockGetHeader = vi.fn()

vi.mock('h3', async () => {
  const h3 = await vi.importActual('h3')
  return {
    ...h3,
    getCookie: mockGetCookie,
    setCookie: mockSetCookie,
    deleteCookie: mockDeleteCookie,
    getHeader: mockGetHeader
  }
})

describe('JWT Utils', () => {
  const mockUser: AuthUser = {
    id: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockEvent = {} as unknown

  beforeEach(() => {
    vi.clearAllMocks()
    // S'assurer que JWT_SECRET est défini pour les tests
    process.env.JWT_SECRET = 'test-secret-key-for-testing-only-very-long-and-secure'
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('generateToken', () => {
    it('devrait générer un token JWT valide', () => {
      const token = generateToken(mockUser)

      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
      expect(token.split('.')).toHaveLength(3) // JWT format: header.payload.signature
    })

    it('devrait inclure les bonnes informations dans le payload', () => {
      const token = generateToken(mockUser)
      const decoded = verifyToken(token)

      expect(decoded).toBeTruthy()
      expect(decoded?.id).toBe(mockUser.id)
      expect(decoded?.email).toBe(mockUser.email)
      expect(decoded?.firstName).toBe(mockUser.firstName)
      expect(decoded?.lastName).toBe(mockUser.lastName)
      expect(decoded?.role).toBe(mockUser.role)
      expect(decoded?.iat).toBeDefined()
      expect(decoded?.exp).toBeDefined()
    })
  })

  describe('verifyToken', () => {
    it('devrait vérifier un token valide', () => {
      const token = generateToken(mockUser)
      const decoded = verifyToken(token)

      expect(decoded).toBeTruthy()
      expect(decoded?.id).toBe(mockUser.id)
      expect(decoded?.email).toBe(mockUser.email)
    })

    it('devrait retourner null pour un token invalide', () => {
      const invalidToken = 'invalid.token.here'
      const decoded = verifyToken(invalidToken)

      expect(decoded).toBeNull()
    })

    it('devrait retourner null pour un token vide', () => {
      const decoded = verifyToken('')

      expect(decoded).toBeNull()
    })

    it('devrait retourner null pour un token malformé', () => {
      const malformedToken = 'not-a-jwt-token'
      const decoded = verifyToken(malformedToken)

      expect(decoded).toBeNull()
    })
  })

  describe('extractTokenFromRequest', () => {
    it('devrait extraire le token depuis les cookies', () => {
      const testToken = 'cookie-token'
      mockGetCookie.mockReturnValue(testToken)
      mockGetHeader.mockReturnValue(null)

      const token = extractTokenFromRequest(mockEvent)

      expect(token).toBe(testToken)
      expect(mockGetCookie).toHaveBeenCalledWith(mockEvent, 'auth-token')
    })

    it('devrait extraire le token depuis le header Authorization', () => {
      const testToken = 'header-token'
      mockGetCookie.mockReturnValue(null)
      mockGetHeader.mockReturnValue(`Bearer ${testToken}`)

      const token = extractTokenFromRequest(mockEvent)

      expect(token).toBe(testToken)
      expect(mockGetHeader).toHaveBeenCalledWith(mockEvent, 'authorization')
    })

    it('devrait prioriser le cookie sur le header', () => {
      const cookieToken = 'cookie-token'
      const headerToken = 'header-token'
      mockGetCookie.mockReturnValue(cookieToken)
      mockGetHeader.mockReturnValue(`Bearer ${headerToken}`)

      const token = extractTokenFromRequest(mockEvent)

      expect(token).toBe(cookieToken)
    })

    it('devrait retourner null si aucun token n\'est trouvé', () => {
      mockGetCookie.mockReturnValue(null)
      mockGetHeader.mockReturnValue(null)

      const token = extractTokenFromRequest(mockEvent)

      expect(token).toBeNull()
    })

    it('devrait retourner null pour un header Authorization mal formé', () => {
      mockGetCookie.mockReturnValue(null)
      mockGetHeader.mockReturnValue('InvalidHeader token')

      const token = extractTokenFromRequest(mockEvent)

      expect(token).toBeNull()
    })
  })

  describe('setJWTCookie', () => {
    it('devrait définir un cookie JWT avec les bonnes options', () => {
      const testToken = 'test-token'
      
      setJWTCookie(mockEvent, testToken)

      expect(mockSetCookie).toHaveBeenCalledWith(
        mockEvent,
        'auth-token',
        testToken,
        {
          maxAge: 60 * 60 * 24 * 7, // 7 jours
          httpOnly: true,
          secure: false, // NODE_ENV !== 'production' dans les tests
          sameSite: 'lax',
          path: '/',
          domain: undefined
        }
      )
    })

    it('devrait utiliser secure: true en production', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      process.env.DOMAIN = 'example.com'
      
      const testToken = 'test-token'
      
      setJWTCookie(mockEvent, testToken)

      expect(mockSetCookie).toHaveBeenCalledWith(
        mockEvent,
        'auth-token',
        testToken,
        expect.objectContaining({
          secure: true,
          domain: 'example.com'
        })
      )

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('clearJWTCookie', () => {
    it('devrait supprimer le cookie JWT avec les bonnes options', () => {
      clearJWTCookie(mockEvent)

      expect(mockDeleteCookie).toHaveBeenCalledWith(
        mockEvent,
        'auth-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
          domain: undefined
        }
      )
    })
  })

  describe('verifyJWT', () => {
    it('devrait vérifier et retourner le payload d\'un token valide', () => {
      const validToken = generateToken(mockUser)
      mockGetCookie.mockReturnValue(validToken)

      const payload = verifyJWT(mockEvent)

      expect(payload).toBeTruthy()
      expect(payload?.id).toBe(mockUser.id)
      expect(payload?.email).toBe(mockUser.email)
    })

    it('devrait retourner null si aucun token n\'est trouvé', () => {
      mockGetCookie.mockReturnValue(null)
      mockGetHeader.mockReturnValue(null)

      const payload = verifyJWT(mockEvent)

      expect(payload).toBeNull()
    })

    it('devrait retourner null pour un token invalide', () => {
      const invalidToken = 'invalid-token'
      mockGetCookie.mockReturnValue(invalidToken)

      const payload = verifyJWT(mockEvent)

      expect(payload).toBeNull()
    })
  })

  describe('Intégration complète', () => {
    it('devrait générer, stocker et vérifier un token complet', () => {
      // Générer un token
      const token = generateToken(mockUser)
      
      // Simuler le stockage dans un cookie
      mockGetCookie.mockReturnValue(token)
      
      // Vérifier le token depuis la requête
      const payload = verifyJWT(mockEvent)
      
      expect(payload).toBeTruthy()
      expect(payload?.id).toBe(mockUser.id)
      expect(payload?.email).toBe(mockUser.email)
      expect(payload?.role).toBe(mockUser.role)
    })

    it('devrait gérer un cycle complet de création et suppression de cookie', () => {
      const token = generateToken(mockUser)
      
      // Définir le cookie
      setJWTCookie(mockEvent, token)
      expect(mockSetCookie).toHaveBeenCalled()
      
      // Supprimer le cookie
      clearJWTCookie(mockEvent)
      expect(mockDeleteCookie).toHaveBeenCalled()
    })
  })
})