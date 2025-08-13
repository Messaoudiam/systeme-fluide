/**
 * Types de validation centralisés pour Système Fluide
 * Alignés avec la structure de la base de données et les besoins métier
 */

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: ValidationError[]
}

// Types pour les données quotidiennes (aligné avec le dashboard)
export interface DailyFormData {
  selectedDate: string
  calories: number | null
  proteins: number | null
  carbs: number | null
  fats: number | null
  weight: number | null
  steps: number | null
  workout: boolean
  workoutName: string
}

// Types pour les statistiques quotidiennes
export interface DailyStats {
  date: string
  calories: number | null
  proteins: number | null
  carbs: number | null
  fats: number | null
  weight: number | null
  steps: number | null
  workout: boolean
  workoutName: string | null
}

// Types pour les moyennes hebdomadaires
export interface WeeklyAverages {
  avgCalories: number | null
  avgProteins: number | null
  avgCarbs: number | null
  avgFats: number | null
  avgWeight: number | null
  avgSteps: number | null
  workoutFrequency: number
}

// Types pour le calculateur TDEE (utilise male/female)
export interface TDEECalculatorData {
  gender: 'male' | 'female'
  age: number
  weight: number
  height: number
  activityLevel: number
  bodyFat?: number
}

// Types pour l'utilisateur (avec nouveau format gender)
export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  birthDate?: string
  gender?: 'male' | 'female' | 'other'
  heightCm?: number
  targetWeightKg?: number
  targetStepsPerDay?: number
  targetCaloriesPerDay?: number
}

// Types pour les logs de poids (DB utilise string pour weightKg)
export interface WeightLogEntry {
  id: string
  userId: string
  logDate: string
  weightKg: string // DB stocke en string numeric
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Types pour les pas quotidiens (DB utilise stepCount)
export interface DailyStepsEntry {
  id: string
  userId: string
  logDate: string
  stepCount: number
  distanceMeters?: number
  caloriesBurned?: number
  createdAt: Date
  updatedAt: Date
}

// Types pour les calories quotidiennes (aligné avec la DB)
export interface DailyCaloriesEntry {
  id: string
  userId: string
  logDate: string
  totalCalories: number
  proteinsGrams?: number
  carbsGrams?: number
  fatsGrams?: number
  mealDetails?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Types pour les entraînements
export interface WorkoutEntry {
  id: string
  userId: string
  workoutName?: string
  workoutDate: string
  durationMinutes?: number
  trainingType?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Énumérations pour les constantes
export enum Gender {
  MALE = 'male',
  FEMALE = 'female', 
  OTHER = 'other'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum ValidationErrorCodes {
  REQUIRED = 'REQUIRED',
  INVALID_FORMAT = 'INVALID_FORMAT',
  OUT_OF_RANGE = 'OUT_OF_RANGE',
  TOO_LONG = 'TOO_LONG',
  TOO_SHORT = 'TOO_SHORT',
  INVALID_ENUM = 'INVALID_ENUM'
}