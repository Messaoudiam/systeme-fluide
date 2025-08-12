interface RateLimitEntry {
  count: number
  lastAttempt: number
  blockedUntil?: number
}

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  blockDurationMs: number
}

/**
 * Cache en mémoire pour tracker les tentatives de connexion
 * En production, utilisez Redis pour un système distribué
 */
const loginAttempts = new Map<string, RateLimitEntry>()

/**
 * Configuration du rate limiting pour les connexions
 */
const LOGIN_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5, // 5 tentatives maximum
  windowMs: 15 * 60 * 1000, // dans une fenêtre de 15 minutes
  blockDurationMs: 15 * 60 * 1000 // blocage pendant 15 minutes
}

/**
 * Génère une clé unique pour identifier l'utilisateur
 * Combine IP + email pour une protection optimale
 */
function getRateLimitKey(ip: string, email: string): string {
  return `${ip}:${email.toLowerCase()}`
}

/**
 * Nettoie les entrées expirées du cache
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, entry] of loginAttempts.entries()) {
    // Supprimer les entrées anciennes ou dont le blocage est terminé
    if (
      now - entry.lastAttempt > LOGIN_RATE_LIMIT.windowMs && 
      (!entry.blockedUntil || now > entry.blockedUntil)
    ) {
      loginAttempts.delete(key)
    }
  }
}

/**
 * Vérifie si un utilisateur peut tenter une connexion
 * @param ip - Adresse IP du client
 * @param email - Email de l'utilisateur
 * @returns Object avec le statut et les informations de limitation
 */
export function checkRateLimit(ip: string, email: string): {
  allowed: boolean
  remainingAttempts?: number
  resetTime?: number
  blockedUntil?: number
} {
  cleanupExpiredEntries()
  
  const key = getRateLimitKey(ip, email)
  const now = Date.now()
  const entry = loginAttempts.get(key)

  if (!entry) {
    // Première tentative pour cette combinaison IP/email
    return {
      allowed: true,
      remainingAttempts: LOGIN_RATE_LIMIT.maxAttempts - 1,
      resetTime: now + LOGIN_RATE_LIMIT.windowMs
    }
  }

  // Vérifier si l'utilisateur est actuellement bloqué
  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      allowed: false,
      blockedUntil: entry.blockedUntil,
      remainingAttempts: 0
    }
  }

  // Si la fenêtre de temps est dépassée, reset le compteur
  if (now - entry.lastAttempt > LOGIN_RATE_LIMIT.windowMs) {
    return {
      allowed: true,
      remainingAttempts: LOGIN_RATE_LIMIT.maxAttempts - 1,
      resetTime: now + LOGIN_RATE_LIMIT.windowMs
    }
  }

  // Vérifier le nombre de tentatives dans la fenêtre actuelle
  if (entry.count >= LOGIN_RATE_LIMIT.maxAttempts) {
    return {
      allowed: false,
      blockedUntil: entry.blockedUntil || (now + LOGIN_RATE_LIMIT.blockDurationMs),
      remainingAttempts: 0
    }
  }

  return {
    allowed: true,
    remainingAttempts: LOGIN_RATE_LIMIT.maxAttempts - entry.count - 1,
    resetTime: entry.lastAttempt + LOGIN_RATE_LIMIT.windowMs
  }
}

/**
 * Enregistre une tentative de connexion (réussie ou échouée)
 * @param ip - Adresse IP du client
 * @param email - Email de l'utilisateur
 * @param success - Si la connexion a réussi
 */
export function recordLoginAttempt(ip: string, email: string, success: boolean): void {
  const key = getRateLimitKey(ip, email)
  const now = Date.now()
  const entry = loginAttempts.get(key)

  if (success) {
    // Connexion réussie : supprimer l'entrée pour reset le compteur
    loginAttempts.delete(key)
    return
  }

  // Connexion échouée : incrémenter le compteur
  if (!entry || (now - entry.lastAttempt > LOGIN_RATE_LIMIT.windowMs)) {
    // Nouvelle période ou première tentative
    loginAttempts.set(key, {
      count: 1,
      lastAttempt: now
    })
  } else {
    // Incrémenter le compteur existant
    const newCount = entry.count + 1
    const updatedEntry: RateLimitEntry = {
      count: newCount,
      lastAttempt: now
    }

    // Si on atteint la limite, bloquer l'utilisateur
    if (newCount >= LOGIN_RATE_LIMIT.maxAttempts) {
      updatedEntry.blockedUntil = now + LOGIN_RATE_LIMIT.blockDurationMs
    }

    loginAttempts.set(key, updatedEntry)
  }
}

/**
 * Obtient l'adresse IP réelle du client (gère les proxies/CDN)
 */
export function getClientIP(event: any): string {
  // Vérifier les headers communs pour l'IP réelle
  const forwardedFor = getHeader(event, 'x-forwarded-for')
  const realIP = getHeader(event, 'x-real-ip')
  const cfConnectingIP = getHeader(event, 'cf-connecting-ip')
  
  // Prendre la première IP si x-forwarded-for contient une liste
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim())
    return ips[0]
  }
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  
  // Fallback sur l'IP de connexion
  return event.node.req.connection?.remoteAddress || 
         event.node.req.socket?.remoteAddress || 
         '127.0.0.1'
}

/**
 * Fonction utilitaire pour formater le temps restant
 */
export function formatTimeRemaining(timestamp: number): string {
  const now = Date.now()
  const diff = Math.max(0, timestamp - now)
  
  if (diff === 0) return '0 secondes'
  
  const minutes = Math.ceil(diff / (60 * 1000))
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`
  
  const hours = Math.ceil(diff / (60 * 60 * 1000))
  return `${hours} heure${hours > 1 ? 's' : ''}`
}