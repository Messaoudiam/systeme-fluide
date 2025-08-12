export const useDatabase = () => {
  const testConnection = async () => {
    try {
      const data = await $fetch('/api/test-db')
      return { success: true, data: data, message: 'Connexion réussie !' }
    } catch (error) {
      console.error('Erreur de connexion DB:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }
    }
  }

  const createUser = async (userData: {
    email: string
    firstName: string  
    lastName: string
    birthDate?: string
    gender?: string
  }) => {
    try {
      const user = await $fetch('/api/users', {
        method: 'POST',
        body: userData
      })
      return { success: true, data: user }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur création utilisateur'
      }
    }
  }

  // Récupérer les statistiques quotidiennes d'un utilisateur
  const getDailyStats = async (userId: number, date?: string) => {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0]
      const data = await $fetch(`/api/stats/daily/${userId}?date=${targetDate}`)
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur récupération stats quotidiennes'
      }
    }
  }

  // Récupérer les moyennes hebdomadaires d'un utilisateur
  const getWeeklyAverages = async (userId: number) => {
    try {
      const data = await $fetch(`/api/stats/weekly/${userId}`)
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur récupération moyennes hebdomadaires'
      }
    }
  }

  // Sauvegarder les données quotidiennes
  const saveDailyData = async (userId: number, dailyData: {
    calories?: number
    proteins?: number
    carbs?: number
    fats?: number
    weight?: number
    steps?: number
    workout?: boolean
    workoutName?: string
  }) => {
    try {
      const data = await $fetch('/api/daily-data', {
        method: 'POST',
        body: { userId, ...dailyData }
      })
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur sauvegarde données quotidiennes'
      }
    }
  }

  // Récupérer les statistiques d'administration
  const getAdminStats = async () => {
    try {
      const data = await $fetch('/api/admin/stats')
      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur récupération stats admin'
      }
    }
  }

  return {
    testConnection,
    createUser,
    getDailyStats,
    getWeeklyAverages,
    saveDailyData,
    getAdminStats
  }
}