import { eq } from 'drizzle-orm'
import { users } from '~/database/schema'
import type { LoginCredentials } from '~/types/auth'
import { generateToken, setJWTCookie } from '~/server/utils/jwt'
import { verifyPassword } from '~/server/utils/password'

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginCredentials>(event)
  
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }

  try {
    const db = await useDatabase()
    
    // Rechercher l'utilisateur par email
    const dbUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
    
    if (dbUser.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })
    }
    
    const user = dbUser[0]
    
    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await verifyPassword(body.password, user.password)
    
    if (!isPasswordValid) {
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