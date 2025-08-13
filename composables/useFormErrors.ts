import type { ValidationErrorResponse } from '~/types/errors'

export interface FormError {
  field: string
  message: string
  code?: string
}

export interface FormErrorState {
  errors: Record<string, string>
  hasErrors: boolean
  generalError: string | null
}

/**
 * Composable pour gérer les erreurs de formulaire
 */
export function useFormErrors() {
  const state = reactive<FormErrorState>({
    errors: {},
    hasErrors: false,
    generalError: null
  })

  /**
   * Définit une erreur pour un champ spécifique
   */
  function setFieldError(field: string, message: string) {
    state.errors[field] = message
    updateErrorState()
  }

  /**
   * Définit plusieurs erreurs de champs
   */
  function setFieldErrors(errors: Record<string, string>) {
    Object.assign(state.errors, errors)
    updateErrorState()
  }

  /**
   * Supprime l'erreur d'un champ spécifique
   */
  function clearFieldError(field: string) {
    const { [field]: _, ...rest } = state.errors
    state.errors = rest
    updateErrorState()
  }

  /**
   * Supprime toutes les erreurs de champs
   */
  function clearFieldErrors() {
    state.errors = {}
    updateErrorState()
  }

  /**
   * Définit une erreur générale
   */
  function setGeneralError(message: string) {
    state.generalError = message
  }

  /**
   * Supprime l'erreur générale
   */
  function clearGeneralError() {
    state.generalError = null
  }

  /**
   * Supprime toutes les erreurs
   */
  function clearAllErrors() {
    clearFieldErrors()
    clearGeneralError()
  }

  /**
   * Traite une erreur d'API et extrait les erreurs de champs
   */
  function handleApiError(error: unknown) {
    clearAllErrors()

    const errorData = error as ValidationErrorResponse
    
    // Erreurs de validation avec détails des champs
    if (errorData?.data?.errors && Array.isArray(errorData.data.errors)) {
      const fieldErrors: Record<string, string> = {}
      
      errorData.data.errors.forEach((err: { field?: string; message?: string }) => {
        if (err.field && err.message) {
          fieldErrors[err.field] = err.message
        }
      })
      
      if (Object.keys(fieldErrors).length > 0) {
        setFieldErrors(fieldErrors)
      } else {
        setGeneralError(errorData?.statusMessage || errorData?.message || 'Une erreur est survenue')
      }
    }
    // Erreur avec un champ spécifique
    else if (errorData?.data?.field && errorData?.data?.message) {
      setFieldError(errorData.data.field, errorData.data.message)
    }
    // Erreur générale
    else {
      setGeneralError(errorData?.statusMessage || errorData?.message || 'Une erreur est survenue')
    }
  }

  /**
   * Obtient l'erreur d'un champ spécifique
   */
  function getFieldError(field: string): string | undefined {
    return state.errors[field]
  }

  /**
   * Vérifie si un champ a une erreur
   */
  function hasFieldError(field: string): boolean {
    return !!state.errors[field]
  }

  /**
   * Obtient toutes les erreurs sous forme de liste
   */
  function getAllErrorMessages(): string[] {
    const messages: string[] = []
    
    if (state.generalError) {
      messages.push(state.generalError)
    }
    
    Object.values(state.errors).forEach(error => {
      if (error) {
        messages.push(error)
      }
    })
    
    return messages
  }

  /**
   * Met à jour l'état général des erreurs
   */
  function updateErrorState() {
    state.hasErrors = Object.keys(state.errors).length > 0 || !!state.generalError
  }

  /**
   * Créé un handler d'erreur optimisé pour les formulaires
   */
  function createErrorHandler(options?: {
    onError?: (error: unknown) => void
    showNotification?: boolean
  }) {
    return (error: unknown) => {
      handleApiError(error)
      
      if (options?.onError) {
        options.onError(error)
      }
      
      if (options?.showNotification && state.generalError) {
        // Si vous avez un système de notifications, l'utiliser ici
        console.error('Erreur de formulaire:', state.generalError)
      }
    }
  }

  return {
    // État réactif
    errors: readonly(toRef(state, 'errors')),
    hasErrors: readonly(toRef(state, 'hasErrors')),
    generalError: readonly(toRef(state, 'generalError')),
    
    // Actions
    setFieldError,
    setFieldErrors,
    clearFieldError,
    clearFieldErrors,
    setGeneralError,
    clearGeneralError,
    clearAllErrors,
    handleApiError,
    
    // Getters
    getFieldError,
    hasFieldError,
    getAllErrorMessages,
    
    // Utilitaires
    createErrorHandler
  }
}