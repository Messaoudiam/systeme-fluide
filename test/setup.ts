import { vi } from 'vitest'

// Mock des variables d'environnement pour les tests
process.env.JWT_SECRET = 'test-secret-key-for-testing-only-very-long-and-secure'
process.env.NODE_ENV = 'test'

// Mock des fonctions H3
vi.mock('h3', () => ({
  getCookie: vi.fn(),
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
  getHeader: vi.fn(),
  createError: vi.fn((config) => {
    const error = new Error(config.statusMessage || 'Error') as Error & { statusCode?: number; statusMessage?: string }
    error.statusCode = config.statusCode
    error.statusMessage = config.statusMessage
    return error
  }),
  defineEventHandler: vi.fn((handler) => handler),
  readBody: vi.fn(),
  getQuery: vi.fn()
}))

// Mock des composables Vue
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    reactive: vi.fn((obj) => obj),
    readonly: vi.fn((obj) => obj),
    computed: vi.fn((fn) => ({ value: fn() })),
    ref: vi.fn((val) => ({ value: val }))
  }
})