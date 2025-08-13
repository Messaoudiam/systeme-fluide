/**
 * Types pour la gestion d'erreurs dans l'application
 */

export interface ApiError {
  statusCode?: number
  statusMessage?: string
  message?: string
  data?: {
    errors?: Array<{
      field?: string
      message?: string
      code?: string
    }>
    field?: string
    message?: string
  }
}

export interface ValidationErrorDetail {
  field?: string
  message?: string
  code?: string
}

export interface ValidationErrorResponse {
  data?: {
    errors?: ValidationErrorDetail[]
    field?: string
    message?: string
  }
  statusMessage?: string
  message?: string
}

/**
 * Type guard pour vérifier si un objet est une erreur API
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === 'object' &&
    ('statusCode' in error || 'statusMessage' in error || 'message' in error)
  )
}

/**
 * Type guard pour vérifier si un objet a une propriété statusCode
 */
export function hasStatusCode(error: unknown): error is { statusCode: number } {
  return error !== null && typeof error === 'object' && 'statusCode' in error
}