import jwt from 'jsonwebtoken'
import type { AuthUser } from '~/types/auth'

// Clé secrète pour signer les tokens (en production, utilisez une variable d'environnement)
const JWT_SECRET = process.env.JWT_SECRET || 'votre-cle-secrete-super-longue-et-complexe-pour-dev'
const JWT_EXPIRES_IN = '7d'

export interface JWTPayload {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  iat?: number
  exp?: number
}

/**
 * Génère un token JWT pour un utilisateur
 */
export function generateToken(user: AuthUser): string {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'systeme-fluide',
    audience: 'systeme-fluide-users'
  })
}

/**
 * Vérifie et décode un token JWT
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'systeme-fluide',
      audience: 'systeme-fluide-users'
    }) as JWTPayload

    return decoded
  } catch (error) {
    console.error('Erreur vérification JWT:', error)
    return null
  }
}

/**
 * Extrait le token JWT d'une requête (cookie ou header Authorization)
 */
export function extractTokenFromRequest(event: any): string | null {
  // Vérifier d'abord dans les cookies
  const cookieToken = getCookie(event, 'auth-token')
  if (cookieToken) {
    return cookieToken
  }

  // Puis dans le header Authorization
  const authHeader = getHeader(event, 'authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  return null
}

/**
 * Définit le cookie JWT sécurisé
 */
export function setJWTCookie(event: any, token: string) {
  setCookie(event, 'auth-token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined
  })
}

/**
 * Supprime le cookie JWT
 */
export function clearJWTCookie(event: any) {
  deleteCookie(event, 'auth-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined
  })
}