import bcrypt from 'bcrypt'

/**
 * Nombre de rounds pour le salt bcrypt
 * 12 est un bon compromis entre sécurité et performance
 */
const SALT_ROUNDS = 12

/**
 * Hashe un mot de passe avec bcrypt
 * @param password - Le mot de passe en clair
 * @returns Le mot de passe hashé
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
  } catch (error) {
    console.error('Erreur lors du hashage du mot de passe:', error)
    throw new Error('Erreur lors du hashage du mot de passe')
  }
}

/**
 * Vérifie un mot de passe contre son hash
 * @param password - Le mot de passe en clair à vérifier
 * @param hashedPassword - Le hash stocké en base
 * @returns true si le mot de passe correspond, false sinon
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword)
    return isValid
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error)
    return false
  }
}

/**
 * Valide la force d'un mot de passe
 * @param password - Le mot de passe à valider
 * @returns true si le mot de passe est valide, false sinon
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: 'Le mot de passe est requis' }
  }

  if (password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' }
  }

  if (password.length > 128) {
    return { valid: false, message: 'Le mot de passe ne peut pas dépasser 128 caractères' }
  }

  // Vérifier qu'il contient au moins une lettre et un chiffre
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (!hasLetter || !hasNumber) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une lettre et un chiffre' }
  }

  return { valid: true }
}