import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '~/composables/useAuth'
import type { AuthUser, LoginCredentials, RegisterData } from '~/types/auth'

// Mock des fonctions Nuxt
const mockFetch = vi.fn()
const mockNavigateTo = vi.fn()
const mockUseState = vi.fn()
const mockComputed = vi.fn()
const mockUseRequestHeaders = vi.fn()

vi.mock('#app', () => ({
  $fetch: mockFetch,
  navigateTo: mockNavigateTo,
  useState: mockUseState,
  computed: mockComputed,
  useRequestHeaders: mockUseRequestHeaders,
  readonly: vi.fn(val => val)
}))

describe('useAuth', () => {
  let mockUserState: { value: AuthUser | null }
  const mockUser: AuthUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockUserState = { value: null }
    mockUseState.mockReturnValue(mockUserState)
    mockComputed.mockImplementation((fn) => ({ value: fn() }))
    mockUseRequestHeaders.mockReturnValue({})
  })

  describe('État initial', () => {
    it('devrait initialiser avec un utilisateur null', () => {
      const { user, isLoggedIn, isAdmin, isUser } = useAuth()

      expect(user.value).toBeNull()
      expect(isLoggedIn.value).toBe(false)
      expect(isAdmin.value).toBe(false)
      expect(isUser.value).toBe(false)
    })
  })

  describe('Computed properties', () => {
    it('devrait calculer correctement isLoggedIn', () => {
      mockUserState.value = mockUser
      const { isLoggedIn } = useAuth()

      expect(isLoggedIn.value).toBe(true)
    })

    it('devrait calculer correctement isAdmin', () => {
      mockUserState.value = { ...mockUser, role: 'admin' }
      const { isAdmin } = useAuth()

      expect(isAdmin.value).toBe(true)
    })

    it('devrait calculer correctement isUser', () => {
      mockUserState.value = mockUser
      const { isUser } = useAuth()

      expect(isUser.value).toBe(true)
    })
  })

  describe('login', () => {
    const credentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123'
    }

    it('devrait connecter l\'utilisateur avec succès', async () => {
      const mockResponse = { user: mockUser, token: 'jwt-token' }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const { login } = useAuth()
      const result = await login(credentials)

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      expect(mockUserState.value).toEqual(mockUser)
      expect(result).toEqual({ success: true, user: mockUser })
    })

    it('devrait gérer les erreurs de connexion', async () => {
      const errorMessage = 'Identifiants invalides'
      mockFetch.mockRejectedValueOnce({ 
        data: { message: errorMessage } 
      })

      const { login } = useAuth()
      const result = await login(credentials)

      expect(result).toEqual({ 
        success: false, 
        error: errorMessage 
      })
      expect(mockUserState.value).toBeNull()
    })

    it('devrait utiliser un message d\'erreur par défaut', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { login } = useAuth()
      const result = await login(credentials)

      expect(result).toEqual({ 
        success: false, 
        error: 'Identifiants invalides' 
      })
    })
  })

  describe('register', () => {
    const registerData: RegisterData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    }

    it('devrait inscrire l\'utilisateur avec succès', async () => {
      const mockResponse = { user: mockUser, token: 'jwt-token' }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const { register } = useAuth()
      const result = await register(registerData)

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        body: registerData
      })
      expect(mockUserState.value).toEqual(mockUser)
      expect(result).toEqual({ success: true, user: mockUser })
    })

    it('devrait gérer les erreurs d\'inscription', async () => {
      const errorMessage = 'Email déjà utilisé'
      mockFetch.mockRejectedValueOnce({ 
        data: { message: errorMessage } 
      })

      const { register } = useAuth()
      const result = await register(registerData)

      expect(result).toEqual({ 
        success: false, 
        error: errorMessage 
      })
      expect(mockUserState.value).toBeNull()
    })
  })

  describe('logout', () => {
    beforeEach(() => {
      mockUserState.value = mockUser
    })

    it('devrait déconnecter l\'utilisateur avec succès', async () => {
      mockFetch.mockResolvedValueOnce({})

      const { logout } = useAuth()
      await logout()

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/logout', { 
        method: 'POST' 
      })
      expect(mockUserState.value).toBeNull()
      expect(mockNavigateTo).toHaveBeenCalledWith('/')
    })

    it('devrait déconnecter même en cas d\'erreur serveur', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Server error'))

      const { logout } = useAuth()
      await logout()

      expect(mockUserState.value).toBeNull()
      expect(mockNavigateTo).toHaveBeenCalledWith('/')
    })
  })

  describe('checkAuth', () => {
    it('devrait vérifier l\'authentification avec succès', async () => {
      const mockResponse = { user: mockUser }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const { checkAuth } = useAuth()
      const result = await checkAuth()

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/me', {
        headers: {},
        credentials: 'include'
      })
      expect(mockUserState.value).toEqual(mockUser)
      expect(result).toEqual(mockUser)
    })

    it('devrait gérer l\'échec de vérification', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Unauthorized'))

      const { checkAuth } = useAuth()
      const result = await checkAuth()

      expect(mockUserState.value).toBeNull()
      expect(result).toBeNull()
    })

    it('devrait utiliser les headers de cookies en mode serveur', async () => {
      const mockHeaders = { cookie: 'auth-token=abc123' }
      mockUseRequestHeaders.mockReturnValue(mockHeaders)
      
      // Simuler le mode serveur
      Object.defineProperty(import.meta, 'server', { value: true })

      const mockResponse = { user: mockUser }
      mockFetch.mockResolvedValueOnce(mockResponse)

      const { checkAuth } = useAuth()
      await checkAuth()

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/me', {
        headers: mockHeaders,
        credentials: 'include'
      })
    })
  })

  describe('Fonctions d\'autorisation', () => {
    it('devrait vérifier le rôle utilisateur', () => {
      mockUserState.value = mockUser
      const { hasRole } = useAuth()

      expect(hasRole('user')).toBe(true)
      expect(hasRole('admin')).toBe(false)
    })

    it('devrait vérifier l\'accès admin', () => {
      const { canAccessAdmin } = useAuth()
      
      // Utilisateur normal
      mockUserState.value = mockUser
      expect(canAccessAdmin()).toBe(false)
      
      // Utilisateur admin
      mockUserState.value = { ...mockUser, role: 'admin' }
      expect(canAccessAdmin()).toBe(true)
    })

    it('devrait vérifier l\'accès aux fonctionnalités utilisateur', () => {
      const { canAccessUserFeatures } = useAuth()
      
      // Non connecté
      mockUserState.value = null
      expect(canAccessUserFeatures()).toBe(false)
      
      // Connecté
      mockUserState.value = mockUser
      expect(canAccessUserFeatures()).toBe(true)
    })
  })
})