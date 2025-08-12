import { clearJWTCookie } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  // Supprimer le cookie JWT sécurisé
  clearJWTCookie(event)
  
  return { success: true, message: 'Déconnexion réussie' }
})