import { ZodError, type ZodSchema } from 'zod'
import type { H3Event } from 'h3'
import { readBody, createError } from 'h3'
import type { ValidationErrorResponse } from '~/types/errors'

export interface ValidationResult<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    field?: string
    code: string
  }
  errors?: Array<{
    message: string
    field: string
    code: string
  }>
}

/**
 * Valide des données avec un schéma Zod et retourne un résultat structuré
 */
export function validateData<T>(
  schema: ZodSchema<T>, 
  data: unknown
): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data)
    return {
      success: true,
      data: validatedData
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        message: err.message,
        field: err.path.join('.') || 'root',
        code: err.code as string
      }))
      
      return {
        success: false,
        error: errors[0], // Premier erreur pour compatibilité
        errors
      }
    }
    
    return {
      success: false,
      error: {
        message: 'Erreur de validation inconnue',
        code: 'unknown'
      }
    }
  }
}

/**
 * Middleware de validation pour les routes API Nuxt
 */
export function validateRequestBody<T>(schema: ZodSchema<T>) {
  return async (event: H3Event): Promise<T> => {
    const body = await readBody(event)
    const validation = validateData(schema, body)
    
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: validation.error?.message || 'Données invalides',
        data: {
          errors: validation.errors,
          field: validation.error?.field
        }
      })
    }
    
    return validation.data!
  }
}

/**
 * Valide les paramètres de route
 */
export function validateRouteParams<T>(
  schema: ZodSchema<T>, 
  params: Record<string, string>
): ValidationResult<T> {
  return validateData(schema, params)
}

/**
 * Valide les paramètres de requête (query params)
 */
export function validateQueryParams<T>(
  schema: ZodSchema<T>, 
  query: Record<string, string | string[]>
): ValidationResult<T> {
  return validateData(schema, query)
}

/**
 * Transforme une erreur Zod en erreur HTTP structurée
 */
export function createValidationError(
  validation: ValidationResult<unknown>, 
  statusCode: number = 400
) {
  return createError({
    statusCode,
    statusMessage: validation.error?.message || 'Données invalides',
    data: {
      errors: validation.errors,
      field: validation.error?.field
    }
  })
}

/**
 * Extrait les erreurs de validation pour l'affichage côté client
 */
export function extractValidationErrors(error: unknown): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  const errorData = error as ValidationErrorResponse
  
  if (errorData?.data?.errors && Array.isArray(errorData.data.errors)) {
    errorData.data.errors.forEach((err: { field?: string; message?: string }) => {
      if (err.field && err.message) {
        fieldErrors[err.field] = err.message
      }
    })
  }
  
  return fieldErrors
}

/**
 * Valide partiellement un objet (pour les mises à jour)
 */
export function validatePartial<T>(
  schema: ZodSchema<T>, 
  data: unknown
): ValidationResult<Partial<T>> {
  try {
    // Pour les schémas partiels, on doit utiliser une approche différente
    const validatedData = schema.partial().parse(data)
    return {
      success: true,
      data: validatedData
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        message: err.message,
        field: err.path.join('.') || 'root',
        code: err.code as string
      }))
      
      return {
        success: false,
        error: errors[0],
        errors
      }
    }
    
    return {
      success: false,
      error: {
        message: 'Erreur de validation inconnue',
        code: 'unknown'
      }
    }
  }
}