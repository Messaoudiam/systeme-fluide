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
 * Liste des mots de passe les plus couramment compromis à bloquer
 * Basée sur les recommandations NIST 2025 et les listes HaveIBeenPwned
 */
const COMMON_PASSWORDS = new Set([
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'login',
  'azerty', 'motdepasse', 'secret', '000000', '111111', '654321',
  'iloveyou', 'sunshine', 'princess', 'football', 'charlie', 'aa123456',
  'password1', '123123', '1234567890', 'qwertyuiop', 'trustno1'
])

/**
 * Valide la force d'un mot de passe selon les recommandations NIST/OWASP 2025
 * @param password - Le mot de passe à valider
 * @returns objet avec valid (boolean) et message optionnel
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: 'Le mot de passe est requis' }
  }

  // NIST 2025: Minimum 8 caractères, recommandé 12-15
  if (password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' }
  }

  // NIST 2025: Maximum 64 caractères pour les phrases de passe
  if (password.length > 64) {
    return { valid: false, message: 'Le mot de passe ne peut pas dépasser 64 caractères' }
  }

  // NIST 2025: Vérifier contre les mots de passe compromis/communs
  const passwordLower = password.toLowerCase()
  if (COMMON_PASSWORDS.has(passwordLower)) {
    return { 
      valid: false, 
      message: 'Ce mot de passe est trop courant. Choisissez un mot de passe plus unique' 
    }
  }

  // Vérifier les variations évidentes avec des chiffres à la fin
  const passwordWithoutTrailingNumbers = passwordLower.replace(/\d+$/, '')
  if (COMMON_PASSWORDS.has(passwordWithoutTrailingNumbers)) {
    return { 
      valid: false, 
      message: 'Ce mot de passe est basé sur un mot courant. Choisissez un mot de passe plus unique' 
    }
  }

  // NIST 2025: Ne pas imposer de règles de composition
  // (pas d'exigence majuscule/minuscule/chiffre/caractères spéciaux)
  
  return { valid: true }
}