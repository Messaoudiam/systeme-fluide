/**
 * Logger sécurisé pour éviter les fuites de données sensibles
 */

// Données sensibles à masquer
const SENSITIVE_KEYS = [
  'password', 'token', 'jwt', 'secret', 'key', 'auth',
  'email', 'phone', 'ssn', 'credit', 'card'
]

/**
 * Nettoie un objet en masquant les données sensibles
 */
function sanitizeData(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item))
  }
  
  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    const keyLower = key.toLowerCase()
    const isSensitive = SENSITIVE_KEYS.some(sensitive => keyLower.includes(sensitive))
    
    if (isSensitive) {
      sanitized[key] = '[MASKED]'
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

/**
 * Logger sécurisé pour les erreurs
 */
export function logError(message: string, error?: unknown, context?: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error, context)
    return
  }
  
  // En production, nettoyer les données
  const sanitizedError = error ? {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    type: error.constructor?.name
  } : null
  
  const sanitizedContext = context ? sanitizeData(context) : null
  
  console.error({
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message,
    error: sanitizedError,
    context: sanitizedContext,
    env: process.env.NODE_ENV
  })
}

/**
 * Logger pour les infos générales
 */
export function logInfo(message: string, data?: unknown) {
  const sanitizedData = data ? sanitizeData(data) : null
  
  console.log({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message,
    data: sanitizedData
  })
}

/**
 * Logger pour les tentatives de sécurité suspectes
 */
export function logSecurityAlert(message: string, details: {
  ip?: string
  userAgent?: string
  endpoint?: string
  attempt?: string
}) {
  console.warn({
    timestamp: new Date().toISOString(),
    level: 'SECURITY_ALERT',
    message,
    ip: details.ip,
    userAgent: details.userAgent,
    endpoint: details.endpoint,
    attempt: details.attempt
  })
}