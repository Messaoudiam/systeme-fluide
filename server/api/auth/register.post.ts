import { eq } from 'drizzle-orm'
import { users } from '~/database/schema'
import { generateToken, setJWTCookie } from '~/server/utils/jwt'
import { hashPassword } from '~/server/utils/password'
import { useDatabase } from '~/server/utils/database'
import { registerSchema } from '~/server/utils/validation/schemas'
import { validateRequestBody } from '~/server/utils/validation/validator'

export default defineEventHandler(async (event) => {
  const body = await validateRequestBody(registerSchema)(event)

  try {
    const db = await useDatabase()
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
    
    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Un utilisateur avec cet email existe déjà'
      })
    }
    
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(body.password)
    
    // Créer le nouvel utilisateur
    // Note: Le rôle par défaut est 'user', sauf si spécifié autrement
    const newUser = await db.insert(users).values({
      email: body.email,
      password: hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role || 'user'
    }).returning()
    
    const user = newUser[0]
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
    console.error('Erreur d\'inscription:', error)
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de l\'inscription'
    })
  }
})