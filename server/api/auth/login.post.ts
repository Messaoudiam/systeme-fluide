import { eq } from 'drizzle-orm'
import { users } from '~/database/schema'
import type { LoginCredentials } from '~/types/auth'
import { generateToken, setJWTCookie } from '~/server/utils/jwt'
import { verifyPassword } from '~/server/utils/password'
import { checkRateLimit, recordLoginAttempt, getClientIP, formatTimeRemaining } from '~/server/utils/rate-limiter'

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginCredentials>(event)
  
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }

  // Obtenir l'IP du client pour le rate limiting
  const clientIP = getClientIP(event)
  
  // Vérifier le rate limiting AVANT toute opération
  const rateLimitCheck = checkRateLimit(clientIP, body.email)
  
  if (!rateLimitCheck.allowed) {
    const timeRemaining = rateLimitCheck.blockedUntil 
      ? formatTimeRemaining(rateLimitCheck.blockedUntil)
      : 'quelques minutes'
    
    throw createError({
      statusCode: 429,
      statusMessage: `Trop de tentatives de connexion. Réessayez dans ${timeRemaining}.`
    })
  }

  try {
    const db = await useDatabase()
    
    // Rechercher l'utilisateur par email
    const dbUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
    
    if (dbUser.length === 0) {
      // Enregistrer la tentative échouée
      recordLoginAttempt(clientIP, body.email, false)
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })
    }
    
    const user = dbUser[0]
    
    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await verifyPassword(body.password, user.password)
    
    if (!isPasswordValid) {
      // Enregistrer la tentative échouée
      recordLoginAttempt(clientIP, body.email, false)
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })
    }
    
    const authUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as 'admin' | 'user'
    }
    
    // Générer un token JWT sécurisé
    const token = generateToken(authUser)
    
    // Définir le cookie JWT sécurisé
    setJWTCookie(event, token)
    
    // Enregistrer la connexion réussie (reset le compteur)
    recordLoginAttempt(clientIP, body.email, true)
    
    return {
      user: authUser,
      token
    }
  } catch (error) {
    console.error('Erreur de connexion:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de la connexion'
    })
  }
})