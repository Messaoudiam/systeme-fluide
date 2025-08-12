export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  birthDate?: string
  gender?: string
  heightCm?: number
  targetWeightKg?: number
  targetStepsPerDay?: number
  targetCaloriesPerDay?: number
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: UserRole
}