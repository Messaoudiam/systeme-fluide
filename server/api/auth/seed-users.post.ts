import { seedTestUsers } from '~/server/utils/seed-users'

export default defineEventHandler(async (event) => {
  // Limiter cette route au développement seulement
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Route non disponible en production'
    })
  }

  try {
    const result = await seedTestUsers()
    return result
  } catch (error) {
    console.error('Erreur seed users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création des utilisateurs de test'
    })
  }
})