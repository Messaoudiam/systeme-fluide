import { ZodError, type ZodSchema } from 'zod'
import { reactive, readonly } from 'vue'
import type { ValidationErrorResponse } from '~/types/errors'

export interface ValidationError {
  message: string
  field?: string
  code: string
}

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: Record<string, string>
  firstError?: string
}

export interface FormValidationState {
  errors: Record<string, string>
  isValid: boolean
  hasErrors: boolean
  touched: Record<string, boolean>
}

/**
 * Composable pour la validation côté client
 */
export function useValidation() {
  /**
   * Valide des données avec un schéma Zod
   */
  function validate<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
    try {
      const validatedData = schema.parse(data)
      return {
        success: true,
        data: validatedData,
        errors: {},
        firstError: undefined
      }
    } catch (error) {
      const errors: Record<string, string> = {}
      let firstError = 'Données invalides'
      
      if (error instanceof ZodError) {
        (error.issues || []).forEach((err, index) => {
          const field = err.path.join('.') || 'root'
          errors[field] = err.message
          if (index === 0) {
            firstError = err.message
          }
        })
      }
      
      return {
        success: false,
        errors,
        firstError
      }
    }
  }

  /**
   * Valide un champ spécifique
   */
  function validateField<T>(
    schema: ZodSchema<T>, 
    fieldName: keyof T, 
    value: unknown,
    data: Partial<T> = {}
  ): { isValid: boolean; error?: string } {
    try {
      const testData = { ...data, [fieldName]: value } as T
      schema.parse(testData)
      return { isValid: true }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = (error.issues || []).find(err => 
          err.path.includes(fieldName as string)
        )
        if (fieldError) {
          return { isValid: false, error: fieldError.message }
        }
      }
      return { isValid: false, error: 'Valeur invalide' }
    }
  }

  /**
   * Crée un état de validation réactif pour un formulaire
   */
  function createFormValidation<T extends Record<string, unknown>>(
    schema: ZodSchema<T>
  ) {
    const state = reactive<FormValidationState>({
      errors: {},
      isValid: false,
      hasErrors: false,
      touched: {}
    })

    /**
     * Valide tout le formulaire
     */
    function validateForm(data: T): boolean {
      const result = validate(schema, data)
      
      state.errors = result.errors || {}
      state.isValid = result.success
      state.hasErrors = Object.keys(state.errors).length > 0
      
      return result.success
    }

    /**
     * Valide un champ spécifique et met à jour l'état
     */
    function validateSingleField(
      fieldName: keyof T, 
      value: unknown, 
      formData: Partial<T> = {}
    ): boolean {
      const result = validateField(schema, fieldName, value, formData)
      
      state.touched[fieldName as string] = true
      
      if (result.isValid) {
        const { [fieldName as string]: _, ...rest } = state.errors
        state.errors = rest
      } else {
        state.errors[fieldName as string] = result.error || 'Valeur invalide'
      }
      
      state.hasErrors = Object.keys(state.errors).length > 0
      state.isValid = !state.hasErrors
      
      return result.isValid
    }

    /**
     * Marque un champ comme touché
     */
    function touchField(fieldName: keyof T) {
      state.touched[fieldName as string] = true
    }

    /**
     * Remet à zéro l'état de validation
     */
    function resetValidation() {
      state.errors = {}
      state.isValid = false
      state.hasErrors = false
      state.touched = {}
    }

    /**
     * Obtient l'erreur d'un champ spécifique
     */
    function getFieldError(fieldName: keyof T): string | undefined {
      return state.errors[fieldName as string]
    }

    /**
     * Vérifie si un champ a été touché
     */
    function isFieldTouched(fieldName: keyof T): boolean {
      return state.touched[fieldName as string] || false
    }

    /**
     * Vérifie si un champ doit afficher son erreur
     */
    function shouldShowFieldError(fieldName: keyof T): boolean {
      return isFieldTouched(fieldName) && !!getFieldError(fieldName)
    }

    return {
      state: readonly(state),
      validateForm,
      validateSingleField,
      touchField,
      resetValidation,
      getFieldError,
      isFieldTouched,
      shouldShowFieldError
    }
  }

  /**
   * Extrait les erreurs d'une réponse API d'erreur
   */
  function extractApiErrors(error: unknown): Record<string, string> {
    const fieldErrors: Record<string, string> = {}
    const errorData = error as ValidationErrorResponse
    
    if (errorData?.data?.errors && Array.isArray(errorData.data.errors)) {
      errorData.data.errors.forEach((err: { field?: string; message?: string }) => {
        if (err.field && err.message) {
          fieldErrors[err.field] = err.message
        }
      })
    } else if (errorData?.data?.field && errorData?.data?.message) {
      fieldErrors[errorData.data.field] = errorData.data.message
    }
    
    return fieldErrors
  }

  return {
    validate,
    validateField,
    createFormValidation,
    extractApiErrors
  }
}