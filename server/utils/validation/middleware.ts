import type { ZodSchema } from 'zod'
import { validateRequestBody, validateQueryParams, validateRouteParams } from '~/server/utils/validation/validator'

/**
 * Middleware pour valider automatiquement les requêtes API
 */
export function createValidationMiddleware<TBody = unknown, TQuery = unknown, TParams = unknown>(options: {
  body?: ZodSchema<TBody>
  query?: ZodSchema<TQuery>
  params?: ZodSchema<TParams>
}) {
  return defineEventHandler(async (event) => {
    const url = getRouterParam(event, 'url') || event.node.req.url
    
    // Ne traiter que les requêtes API
    if (!url?.startsWith('/api/')) {
      return
    }

    try {
      // Validation du body pour les requêtes POST/PUT/PATCH
      if (options.body && ['POST', 'PUT', 'PATCH'].includes(event.node.req.method || '')) {
        const validatedBody = await validateRequestBody(options.body)(event)
        // Stocker les données validées dans le contexte
        event.context.validatedBody = validatedBody
      }

      // Validation des query parameters
      if (options.query) {
        const query = getQuery(event)
        const validatedQuery = validateQueryParams(options.query, query as Record<string, string | string[]>)
        
        if (!validatedQuery.success) {
          throw createError({
            statusCode: 400,
            statusMessage: validatedQuery.error?.message || 'Paramètres de requête invalides',
            data: {
              errors: validatedQuery.errors,
              field: validatedQuery.error?.field
            }
          })
        }
        
        event.context.validatedQuery = validatedQuery.data
      }

      // Validation des paramètres de route
      if (options.params) {
        const params = getRouterParams(event)
        const validatedParams = validateRouteParams(options.params, params)
        
        if (!validatedParams.success) {
          throw createError({
            statusCode: 400,
            statusMessage: validatedParams.error?.message || 'Paramètres de route invalides',
            data: {
              errors: validatedParams.errors,
              field: validatedParams.error?.field
            }
          })
        }
        
        event.context.validatedParams = validatedParams.data
      }

    } catch (error) {
      // Laisser les erreurs de validation remonter
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error
      }
      
      // Erreurs inattendues
      console.error('Erreur dans le middleware de validation:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur de validation interne'
      })
    }
  })
}

/**
 * Helper pour extraire les données validées depuis le contexte
 */
export function getValidatedData<T>(event: { context: Record<string, unknown> }, type: 'body' | 'query' | 'params'): T | undefined {
  const contextKey = `validated${type.charAt(0).toUpperCase() + type.slice(1)}`
  return event.context[contextKey] as T | undefined
}